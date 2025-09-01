// src/features/currency.js
import { listElementSearch } from "../utils/listElementSearch.js";
import { CurrencyItem } from "../components/CurrencyItem.js";

export function initCurrency() {
  const form   = document.getElementById("add-form");
  const input  = document.getElementById("currency-input");
  const search = document.getElementById("search-input");
  const listElement = document.getElementById("currency-list");

  let currencyList = [];

  function render() {
    const searchText = search.value.trim(); // trimmes i util hvis du ønsker, ellers legg på .trim()
    const listFragment = document.createDocumentFragment();
    const searchResults = listElementSearch(currencyList, searchText);

    // Legge til søkresultater som currencyItem og 
    for (const currency of searchResults) {
      listFragment.appendChild(CurrencyItem(currency));
    }
    listElement.replaceChildren(listFragment);
  }

  // add
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    if (currencyList.some(it => it.toLowerCase() === query.toLowerCase())) {
      input.select();
      return;
    }

    currencyList.push(query);
    input.value = "";
    input.focus();
    render();
  });

  // search – ingen state, bare re-render
  search.addEventListener("input", render);

  // delete via event delegation
  listElement.addEventListener("click", (event) => {
    const btn = event.target.closest(".delete");
    if (!btn) return;

    const li = btn.closest("li");
    if (!li) return;

    const { name } = li.dataset;
    if (!name) return;

    currencyList = currencyList.filter(it => it !== name);
    render();
  });
}
