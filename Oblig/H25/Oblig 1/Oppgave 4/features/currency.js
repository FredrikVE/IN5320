// src/features/currency.js
import { currencySearch } from "../utils/currencySearch.js";
import { CurrencyItem } from "../components/CurrencyItem.js";

export function initCurrency() {
  const form   = document.getElementById("add-form");
  const input  = document.getElementById("currency-input");
  const search = document.getElementById("search-input");
  const listEl = document.getElementById("currency-list");

  // Gjør ingenting hvis markup mangler
  if (!form || !input || !search || !listEl) return;

  const state = { items: [], filter: "" };

  function render() {
    const frag = document.createDocumentFragment();
    const filtered = state.filter
      ? state.items.filter(it => currencySearch(it.name, state.filter))
      : state.items;

    for (const it of filtered) {
      frag.appendChild(CurrencyItem(it.name));
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

    search.value = ""; // unngå at ny post skjules av filter
    state.items.push({ name: q });
    input.value = "";
    input.focus();
    state.filter = "";
    render();
  });

  // search
  search.addEventListener("input", () => {
    state.filter = search.value.trim();
    render();
  });

  // delete via event delegation
  listEl.addEventListener("click", (e) => {
    const btn = e.target instanceof Element ? e.target.closest(".delete") : null;
    if (!btn) return;
    const li = btn.closest("li");
    const name = li?.dataset?.name;
    if (!name) return;

    state.items = state.items.filter(it => it.name !== name);
    render();
  });

  render();
}
