// src/features/currency.js
import { listElementSearch } from "../utils/listElementSearch.js";
import { CurrencyItem } from "../components/currencyItem.js";

export function currencies() {
  const form = document.getElementById("add-form");
  const input = document.getElementById("currency-input");
  const search = document.getElementById("search-input");
  const listElement = document.getElementById("currency-list");

  // Tom liste som lagrer valutaene som legges inn
  let currencyList = [];

  function updateCurrencyList() {
    const searchText = search.value.trim(); // trimmes i util hvis du ønsker, ellers legg på .trim()
    const listFragment = document.createDocumentFragment();
    const searchResults = listElementSearch(currencyList, searchText);

    // Legge til søkresultater som currencyItem og 
    for (const currency of searchResults) {
      listFragment.appendChild(CurrencyItem(currency));
    }
    listElement.replaceChildren(listFragment);
  }

  // Event-listerner for Add currency-knapp
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Duplikatsjekk. Samme valuta skal kun legges til én gang
    const query = input.value.trim();
    if (currencyList.some(it => it.toLowerCase() === query.toLowerCase())) {
      input.select();
      return;
    }

    // Hvis ikke duplikat, legges input inn i currecyList
    currencyList.push(query);  //legger inn resultat i liste.
    input.value = "";          //nullstiller inputfelt etter bruk
    input.focus();             //flytter markøren tilbake til start etter bruk
    updateCurrencyList(); 
  });

  // Event-listener for søkefelt
  search.addEventListener("input", updateCurrencyList);

  // Event-listerner for delete ved klikk på X-knapp
  listElement.addEventListener("click", (event) => {
    const btn = event.target.closest(".delete");
    const li = btn.closest("li");
    const { name } = li.dataset;
    currencyList = currencyList.filter(it => it !== name);
    updateCurrencyList();
  });
}
