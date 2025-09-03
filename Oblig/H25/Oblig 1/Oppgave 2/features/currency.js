import { listElementSearch } from "../utils/listElementSearch.js";
import { CurrencyItem } from "../components/currencyItem.js";

export class Currencies {
  constructor() {
    this.currencyList = [];       // Tom liste som lagrer valutaene som legges inn

    // Henter referanser fra HTML-dokumentene for bruk i js-koden
    this.form = document.getElementById("add-form");
    this.input = document.getElementById("currency-input");
    this.search = document.getElementById("search-input");
    this.listElement = document.getElementById("currency-list");

    this.setupEventListeners(); // instansierer eventlisteneres
  }

  setupEventListeners() {
    this.form.addEventListener("submit", (event) => this.onSubmit(event));          // Event-listener for Add currency-knapp
    this.search.addEventListener("input", () => this.updateCurrencyList()); // Event-listener for søkefelt
    this.listElement.addEventListener("click", (event) => this.onDeleteClick(event));     // Event-listener for delete ved klikk på X-knapp
  }

  updateCurrencyList() {
    const searchText = this.search.value.trim(); // Henter inputtekst for søking. Trimmer bort whitespace.
    const listFragment = document.createDocumentFragment(); // Lager en usynlig beholder i minnet der vi bygger <li> før de settes inn
    const searchResults = listElementSearch(this.currencyList, searchText); // Søk etter elementer lagt til i lista

    // Legger til søkresultater som CurrencyItem
    for (const currency of searchResults) {             // Løper igjennom alle valutaene i state-lista
      listFragment.appendChild(CurrencyItem(currency)); // Bygger <li>-elementer for valuta og legger det i DocumentFragment
    }

    this.listElement.replaceChildren(listFragment); // Tømmer lista og legger inn oppdatert liste for hver gang
  }

  onSubmit(event) {
    event.preventDefault();

    // Duplikatsjekk. Samme valuta skal kun legges til én gang
    const query = this.input.value.trim();
    if (this.currencyList.some(it => it.toLowerCase() === query.toLowerCase())) {
      this.input.select();
      return;
    }

    // Hvis ikke duplikat, legges input inn i currencyList
    this.currencyList.push(query); // Legger inn resultat i liste.
    this.input.value = "";         // Nullstiller inputfelt etter bruk
    this.input.focus();            // Flytter markøren tilbake til start etter bruk
    this.updateCurrencyList();
  }

  onDeleteClick(event) {
    const btn = event.target.closest(".delete"); // Finner nærmeste button-element (inkl. seg selv) som matcher selektoren ".delete".
    const li = btn.closest("li");                // Finner <li>-elementet i DOM-treet fra knappen vi trykket på.
    const { name } = li.dataset;                 // Henter ut valutanavnet i <li>-taggen. Dette brukes til å slette med filter
    const newList = this.currencyList.filter(it => it !== name); // Fjerner slettet element ved å filtrere det bort fra gammel liste
    this.currencyList = newList;                 // Oppdaterer gammel liste til å være den nye filtrerte listen
    this.updateCurrencyList();                   // Oppdaterer lista etter sletting
  }
}
