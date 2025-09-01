// src/features/currency.js
import { currencySearch } from "../utils/currencySearch.js";
import { CurrencyItem } from "../components/CurrencyItem.js";

export function initCurrency() {
  const form   = document.getElementById("add-form");
  const input  = document.getElementById("currency-input");
  const search = document.getElementById("search-input");
  const listEl = document.getElementById("currency-list");

  const state = { items: [] };

  function render() {
    const searchText = search.value.trim();                // les søkeverdi direkte
    const frag = document.createDocumentFragment();

    for (const it of state.items) {
      if (currencySearch(it.name, searchText)) {
        frag.appendChild(CurrencyItem(it.name));
      }
    }
    listEl.replaceChildren(frag);
  }

  // add
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    // duplikatsjekk (case-insensitive)
    if (state.items.some(it => it.name.toLowerCase() === query.toLowerCase())) {
      input.select();
      return;
    }

    state.items.push({ name: query });
    input.value = "";
    input.focus();
    render();
  });

  // search – ingen state, bare re-render
  search.addEventListener("input", render);

  // delete via event delegation
  listEl.addEventListener("click", (event) => {
    const btn = event.target.closest(".delete");
    if (!btn) return;

    const li = btn.closest("li");
    if (!li) return;

    const { name } = li.dataset;
    if (!name) return;

    state.items = state.items.filter(it => it.name !== name);
    render();
  });

  render();
}
