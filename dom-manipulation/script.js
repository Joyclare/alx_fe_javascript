// ===== Quotes Array with Fallback =====
let quotes = [];

// ===== Storage Helpers =====
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    try {
      quotes = JSON.parse(stored);
    } catch (e) {
      quotes = [];
    }
  } else {
    // Initial default quotes
    quotes = [
      { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
      { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" },
      { text: "Success is not in what you have, but who you are.", category: "Success" },
    ];
    saveQuotes();
  }
}

// ===== Required: displayRandomQuote() =====
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

  // Save last viewed quote in sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify({ text, category }));
}

// Alias for backward compatibility
function showRandomQuote() {
  return displayRandomQuote();
}

// ===== Required: addQuote() =====
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

  textInput.value = "";
  categoryInput.value = "";

  display.innerHTML = `"${text}" <span class="quote-category">— ${category}</span>`;
}

// ===== Required: createAddQuoteForm() =====
function createAddQuoteForm() {
  const container = document.getElementById("formContainer");
  if (!container) return;

  container.innerHTML = "";

  const wrapper = document.createElement("div");

  const heading = document.createElement("h2");
  heading.textContent = "Add a New Quote";

  // Label + input for quote text
  const labelText = document.createElement("label");
  labelText.setAttribute("for", "newQuoteText");
  labelText.textContent = "Quote:";
  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";

  // Label + input for category
  const labelCategory = document.createElement("label");
  labelCategory.setAttribute("for", "newQuoteCategory");
  labelCategory.textContent = "Category:";
  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  // Button
  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.id = "addQuoteBtn";
  addBtn.textContent = "Add Quote";
  addBtn.addEventListener("click", addQuote);

  // Append
  wrapper.appendChild(heading);
  wrapper.appendChild(labelText);
  wrapper.appendChild(inputText);
  wrapper.appendChild(labelCategory);
  wrapper.appendChild(inputCategory);
  wrapper.appendChild(addBtn);

  container.appendChild(wrapper);
}

// ===== JSON Export =====
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

// ===== JSON Import =====
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(evt) {
    try {
      const importedQuotes = JSON.parse(evt.target.result);
      if (Array.isArray(importedQuotes)) {
        // Validate each object
        importedQuotes.forEach(q => {
          if (q.text && q.category) {
            quotes.push({ text: q.text, category: q.category });
          }
        });
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format.");
      }
    } catch (e) {
      alert("Error reading JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ===== Wire up events on load =====
document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();

  document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
  document.getElementById("exportJsonBtn").addEventListener("click", exportToJsonFile);
  document.getElementById("importFile").addEventListener("change", importFromJsonFile);

  createAddQuoteForm();

  // Restore last viewed quote from sessionStorage
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    try {
      const { text, category } = JSON.parse(last);
      document.getElementById("quoteDisplay").innerHTML = `"${text}" <span class="quote-category">— ${category}</span>`;
    } catch (e) {
      console.warn("Failed to restore last quote", e);
    }
  }
});
