// Default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Inspiration" },
    { text: "If you are working on something exciting, it will keep you motivated.", category: "Motivation" }
  ];
  
  // Last selected filter (from localStorage)
  let lastFilter = localStorage.getItem("lastFilter") || "all";
  
  // Display quotes
  function displayQuotes(filteredQuotes) {
    const display = document.getElementById("quoteDisplay");
    display.innerHTML = "";
  
    if (filteredQuotes.length === 0) {
      display.innerHTML = "<p>No quotes available for this category.</p>";
      return;
    }
  
    filteredQuotes.forEach(q => {
      const div = document.createElement("div");
      div.classList.add("quote");
      div.innerHTML = `
        <p>"${q.text}"</p>
        <p class="quote-category">Category: ${q.category}</p>
      `;
      display.appendChild(div);
    });
  }
  
  // Populate categories dynamically
  function populateCategories() {
    const select = document.getElementById("categoryFilter");
    select.innerHTML = `<option value="all">All Categories</option>`; // reset first
  
    // Extract unique categories
    const categories = [...new Set(quotes.map(q => q.category))];
  
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      if (cat === lastFilter) option.selected = true; // restore saved filter
      select.appendChild(option);
    });
  }
  
  // Filter quotes based on category
  function filterQuotes() {
    const selected = document.getElementById("categoryFilter").value;
    lastFilter = selected;
    localStorage.setItem("lastFilter", selected);
  
    if (selected === "all") {
      displayQuotes(quotes);
    } else {
      const filtered = quotes.filter(q => q.category === selected);
      displayQuotes(filtered);
    }
  }
  
  // Add a new quote
  function addQuote() {
    const newQuote = document.getElementById("newQuote").value.trim();
    const newCategory = document.getElementById("newCategory").value.trim();
  
    if (!newQuote || !newCategory) {
      alert("Please enter both quote and category.");
      return;
    }
  
    quotes.push({ text: newQuote, category: newCategory });
    localStorage.setItem("quotes", JSON.stringify(quotes));
  
    // Update UI
    populateCategories();
    filterQuotes();
  
    // Clear inputs
    document.getElementById("newQuote").value = "";
    document.getElementById("newCategory").value = "";
  }
  
  // Initialize app
  populateCategories();
  filterQuotes();
  