// src/features/currency.js
import { currencySearch } from "../utils/currencySearch.js";
import { CurrencyItem } from "../components/CurrencyItem.js";

export function initCurrency() {
  const form   = document.getElementById("add-form");
  const input  = document.getElementById("currency-input");
  const search = document.getElementById("search-input");
  const listEl = document.getElementById("currency-list");

  let currencyList = [];

  function render() {
    const searchText = search.value.trim();
    const listFragment = document.createDocumentFragment();
    
    for (const currency of currencyList) {
      if (currencySearch(currency.name, searchText)) {
        listFragment.appendChild(CurrencyItem(currency.name));
      }
    }
    listEl.replaceChildren(listFragment);
  }

  // add
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    if (currencyList.some(it => it.name.toLowerCase() === query.toLowerCase())) {
      input.select();
      return;
    }

    currencyList.push({ name: query });
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

    currencyList = currencyList.filter(it => it.name !== name);
    render();
  });

  // init-render
  render();
}
