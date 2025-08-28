// src/features/currency.js
import { currencySearch } from "../utils/currencySearch.js";
import { CurrencyItem } from "../components/CurrencyItem.js";

export function initCurrency() {
  const form   = document.getElementById("add-form");
  const input  = document.getElementById("currency-input");
  const search = document.getElementById("search-input");
  const listEl = document.getElementById("currency-list");

  // Gjør ingenting hvis markup mangler
  //if (!form || !input || !search || !listEl) return;

  // Fjernet filter fra state
  const state = { items: [] };

  function render() {
    const searchText = search.value.trim();                // les søkeverdi direkte
    const frag = document.createDocumentFragment();

    for (const it of state.items) {
      if (!searchText || currencySearch(it.name, searchText)) {
        frag.appendChild(CurrencyItem(it.name));
      }
    }
    listEl.replaceChildren(frag);
  }

  // add
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;

    // duplikatsjekk (case-insensitive)
    if (state.items.some(it => it.name.toLowerCase() === q.toLowerCase())) {
      input.select();
      return;
    }

    state.items.push({ name: q });
    input.value = "";
    input.focus();
    render();
  });

  // search – ingen state, bare re-render
  search.addEventListener("input", render);

  // delete via event delegation
  listEl.addEventListener("click", (e) => {
    const btn  = e.target.closest?.(".delete");
    const name = btn?.closest("li")?.dataset?.name;
    if (!name) return;

    state.items = state.items.filter(it => it.name !== name);
    render();
  });

  render();
}
