import { addCurrency } from "../components/currencyList.js";
import { startsWithWord } from "../lib/search.js";
import { handleAddCurrency } from "../handlers/addCurrency.js";
import { handleDeleteCurrency } from "../handlers/deleteCurrency.js";

export function initCurrency() {
  const input  = document.getElementById("currency-input");
  const form   = document.getElementById("add-form");
  const search = document.getElementById("search-input");
  const list   = document.getElementById("currency-list");
  if (!input || !form || !list || !search) return;

  const state = { items: [] };

  function render() {
    const term = search.value || "";
    list.innerHTML = "";
    state.items
      .filter(it => startsWithWord(it.label, term))
      .forEach(it =>
        addCurrency(list, it, {
          onDelete: (item) => handleDeleteCurrency(item, state, render),
        })
      );
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    search.value = ""; // ellers kan ny post skjules av filteret
    handleAddCurrency(input, state, render); // ingen genId
  });

  search.addEventListener("input", render);
  render();
}
