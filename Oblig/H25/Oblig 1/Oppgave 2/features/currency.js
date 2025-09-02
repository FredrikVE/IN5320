// src/features/currency.js
import { listElementSearch } from "../utils/listElementSearch.js";
import { CurrencyItem } from "../components/currencyItem.js";

export function currencies() {

  // Henter referanser fra HTML-dokumentene for bruk i js-koden
  const form = document.getElementById("add-form");
  const input = document.getElementById("currency-input");
  const search = document.getElementById("search-input");
  const listElement = document.getElementById("currency-list");

  // Tom liste som lagrer valutaene som legges inn
  let currencyList = [];

  function updateCurrencyList() {
    const searchText = search.value.trim(); // Henter inputtekst for søking. Trimmer bort whitespace.
    const listFragment = document.createDocumentFragment(); // Lager en usynlig beholder i minnet der vi bygger <li> før de settes inn
    const searchResults = listElementSearch(currencyList, searchText); //søk etter elementer lagt til i lista

    // Legger til søkresultater som currencyItem
    for (const currency of searchResults) {              // Løp igjennom alle land i state-lista
      listFragment.appendChild(CurrencyItem(currency)); // Bygg <li> for landet og legg det i DocumentFragment
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
    const btn = event.target.closest(".delete");       // Finner nærmeste button-element (inkl. seg selv) som matcher selektoren ".delete".
    const li = btn.closest("li");                      // Finner <li>-elementet i DOM-treet fra knappen vi trykket på.
    const { name } = li.dataset;                      // Henter ut valutanavnet i <li>-taggen. Dette brukes til å slette med filter
    const newList = currencyList.filter(it => it !== name); // Fjerner slettet element ved å filtrer det bort fr gammel liste
    currencyList = newList;                                 // Oppdaterer gammel liste til å være den nye filtrerte listen
    updateCurrencyList();                                   // Oppdaterer lista etter sletting
  });
}
