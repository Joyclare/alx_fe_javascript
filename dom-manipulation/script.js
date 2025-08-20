// Array of quote objects
let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" },
    { text: "Success is not in what you have, but who you are.", category: "Success" },
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      document.getElementById("quoteDisplay").innerHTML = "No quotes available.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById("quoteDisplay").innerHTML = `
      "${quote.text}" <div class="quote-category">— ${quote.category}</div>
    `;
  }
  
  // Function to add a new quote
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (newText === "" || newCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    // Add new quote object to quotes array
    quotes.push({ text: newText, category: newCategory });
  
    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";
  
    alert("New quote added successfully!");
  }
  
  // Event listeners
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  