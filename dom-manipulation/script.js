// ===== Requisite quotes array (text + category) =====
const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" },
    { text: "Success is not in what you have, but who you are.", category: "Success" },
  ];
  
  // Utility: safely get elements
  function $(id) {
    return document.getElementById(id);
  }
  
  // ===== Required: displayRandomQuote() =====
  function displayRandomQuote() {
    const display = $("quoteDisplay");
    if (!display) return;
  
    if (!Array.isArray(quotes) || quotes.length === 0) {
      display.textContent = "No quotes available.";
      return;
    }
  
    const idx = Math.floor(Math.random() * quotes.length);
    const { text, category } = quotes[idx];
  
    // Update DOM
    display.innerHTML = `"${text}" <span class="quote-category">— ${category}</span>`;
  }
  
  // Optional alias if earlier code/tests referenced showRandomQuote
  function showRandomQuote() {
    return displayRandomQuote();
  }
  
  // ===== Required: addQuote() =====
  function addQuote() {
    const textInput = $("newQuoteText");
    const categoryInput = $("newQuoteCategory");
    const display = $("quoteDisplay");
  
    if (!textInput || !categoryInput) return;
  
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();
  
    if (!text || !category) {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    // Add to quotes array
    quotes.push({ text, category });
  
    // Clear inputs
    textInput.value = "";
    categoryInput.value = "";
  
    // Update DOM (show the newly added quote)
    if (display) {
      display.innerHTML = `"${text}" <span class="quote-category">— ${category}</span>`;
    }
  }
  
  // ===== Required: createAddQuoteForm() =====
  // Build the Add Quote form dynamically (advanced DOM manipulation)
  function createAddQuoteForm() {
    const container = $("formContainer");
    if (!container) return;
  
    // Clear any existing content (idempotent)
    container.innerHTML = "";
  
    const wrapper = document.createElement("div");
  
    const heading = document.createElement("h2");
    heading.textContent = "Add a New Quote";
  
    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.id = "newQuoteText";
    inputText.placeholder = "Enter a new quote";
  
    const inputCategory = document.createElement("input");
    inputCategory.type = "text";
    inputCategory.id = "newQuoteCategory";
    inputCategory.placeholder = "Enter quote category";
  
    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.id = "addQuoteBtn";
    addBtn.textContent = "Add Quote";
    addBtn.addEventListener("click", addQuote);
  
    wrapper.appendChild(heading);
    wrapper.appendChild(inputText);
    wrapper.appendChild(inputCategory);
    wrapper.appendChild(addBtn);
  
    container.appendChild(wrapper);
  }
  
  // ===== Wire up events on load =====
  document.addEventListener("DOMContentLoaded", () => {
    // Required: event listener for “Show New Quote” button
    const btn = $("newQuote");
    if (btn) btn.addEventListener("click", displayRandomQuote);
  
    // Build the dynamic Add Quote form
    createAddQuoteForm();
  
    // Optionally show one on load
    // displayRandomQuote();
  });
  