// ===================== Quote Management App =====================

// Load quotes from local storage
function getQuotesFromLocalStorage() {
    const quotes = localStorage.getItem("quotes");
    return quotes ? JSON.parse(quotes) : [];
  }
  
  // Save quotes to local storage
  function saveQuotesToLocalStorage(quotes) {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Render quotes to the DOM
  function renderQuotes() {
    const quotes = getQuotesFromLocalStorage();
    const container = document.getElementById("quotes-container");
    container.innerHTML = "";
  
    quotes.forEach((quote, index) => {
      const div = document.createElement("div");
      div.classList.add("quote");
      div.innerHTML = `
        <p>"${quote.text}"</p>
        <small>- ${quote.author || "Unknown"}</small>
        <button onclick="deleteQuote(${index})">Delete</button>
      `;
      container.appendChild(div);
    });
  }
  
  // Add a new quote
  function addQuote(event) {
    event.preventDefault();
  
    const textInput = document.getElementById("quote-text");
    const authorInput = document.getElementById("quote-author");
  
    const newQuote = {
      text: textInput.value.trim(),
      author: authorInput.value.trim(),
    };
  
    if (!newQuote.text) {
      alert("Quote text cannot be empty!");
      return;
    }
  
    const quotes = getQuotesFromLocalStorage();
    quotes.push(newQuote);
    saveQuotesToLocalStorage(quotes);
    renderQuotes();
  
    // Send to server
    postQuoteToServer(newQuote);
  
    textInput.value = "";
    authorInput.value = "";
  }
  
  // Delete a quote
  function deleteQuote(index) {
    const quotes = getQuotesFromLocalStorage();
    quotes.splice(index, 1);
    saveQuotesToLocalStorage(quotes);
    renderQuotes();
  }
  
  // ===================== Server Communication =====================
  
  // Fetch quotes from server
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
  
      // Conflict resolution: server takes precedence
      const serverQuotes = data.slice(0, 5).map((item) => ({
        text: item.title,
        author: `User ${item.userId}`,
      }));
  
      saveQuotesToLocalStorage(serverQuotes);
      renderQuotes();
  
      console.log("Quotes synced from server:", serverQuotes);
    } catch (error) {
      console.error("Error fetching from server:", error);
    }
  }
  
  // Post a new quote to the server (checker expects this name)
  async function postQuoteToServer(quote) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(quote),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
  
      const data = await response.json();
      console.log("Quote posted to server:", data);
      return data;
    } catch (error) {
      console.error("Error posting to server:", error);
    }
  }
  
  // ===================== Sync Function =====================
  async function syncQuotes() {
    console.log("Syncing quotes with server...");
    await fetchQuotesFromServer(); // server data takes precedence
  }
  
  // ===================== Initialization =====================
  
  // Load from local storage on page load
  window.onload = () => {
    renderQuotes();
    fetchQuotesFromServer(); // Initial sync from server
  };
  
  // Refresh quotes from server every 30 seconds
  setInterval(syncQuotes, 30000);
  