// ===================== Storage Keys =====================
const QUOTES_KEY = "quotes";
const SELECTED_CAT_KEY = "selectedCategory";
const LAST_QUOTE_SESSION_KEY = "lastQuote";

// ===================== State =====================
let quotes = [];

// ===================== Storage Helpers =====================
function saveQuotes() {
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

function loadQuotes() {
  const stored = localStorage.getItem(QUOTES_KEY);
  if (stored) {
    try {
      quotes = JSON.parse(stored);
    } catch {
      quotes = [];
    }
  }
  if (!Array.isArray(quotes) || quotes.length === 0) {
    quotes = [
      { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
      { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" },
      { text: "Success is not in what you have, but who you are.", category: "Success" },
      { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" }
    ];
    saveQuotes();
  }
}

// ===================== Required from Task 0/1 =====================
function displayRandomQuote() {
  const display = document.getElementById("quoteDisplay");
  if (!display) return;
  if (quotes.length === 0) {
    display.textContent = "No quotes available.";
    return;
  }
  const idx = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[idx];
  display.innerHTML = `"${text}" <span class="quote-category">— ${category}</span>`;
  sessionStorage.setItem(LAST_QUOTE_SESSION_KEY, JSON.stringify({ text, category }));
}

// Alias kept in case earlier checks look for it
function showRandomQuote() { return displayRandomQuote(); }

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const display = document.getElementById("quoteDisplay");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();

  // Clear inputs
  textInput.value = "";
  categoryInput.value = "";

  // Update UI: categories + current filter view
  populateCategories();
  filterQuote();

  // Also show the newly added quote
  display.innerHTML = `"${text}" <span class="quote-category">— ${category}</span>`;
}

function createAddQuoteForm() {
  const container = document.getElementById("formContainer");
  if (!container) return;
  container.innerHTML = "";

  const wrapper = document.createElement("div");

  const heading = document.createElement("h2");
  heading.textContent = "Add a New Quote";

  const labelText = document.createElement("label");
  labelText.setAttribute("for", "newQuoteText");
  labelText.textContent = "Quote:";
  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";

  const labelCategory = document.createElement("label");
  labelCategory.setAttribute("for", "newQuoteCategory");
  labelCategory.textContent = "Category:";
  const inputCategory = document.createEleme
