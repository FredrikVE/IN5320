import { listElementSearch } from "../utils/listElementSearch.js";
import { CountryItem } from "../components/countryItem.js";
import { PopulationTicker } from "../utils/ticker.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export class Countries {
  constructor(countriesRepository) {
    this.repository = countriesRepository;    // oppdaterer instansvariablen med riktig repository fra parameter
    this.items = new Map();                   // oppretter et map for å lagre land fra API uten duplikater.

    // Henter referanser fra HTML-dokumentene for bruk i js-koden
    this.form = document.getElementById("country-form");
    this.input = document.getElementById("country-input");
    this.search = document.getElementById("country-search");
    this.listEl = document.getElementById("country-list");

    // Oppretter instans PopulationTicker() for "live" oppdatering av folketall
    this.ticker = new PopulationTicker(this.items);

    this.setupEventListeners(); // Instansierer eventListeners
  }
  
  // Metode som tilordner riktig DOM-element til riktig eventListerner.
  setupEventListeners() {
    this.form.addEventListener("submit", (event) => this.onSubmit(event));
    this.search.addEventListener("input", () => this.updateCountryList());
    this.listEl.addEventListener("click", (event) => this.onDeleteClick(event));
  }

  // Metode for å starte ticker-funksjon når land legges til som listeelement.
  startTicker() {
    if (this.ticker.timer) return;                 // Hvis ticker allerede går. returner og ikke gjør noe
    this.ticker.start(() => this.updateCountryList()); // Ellers start ticker.
  }

  // Metode for å oppdatere og rendre innhold fra lista i HTML-dokumentet
  updateCountryList() {
    const searchText = this.search.value.trim();              // Henter inputtekst for søking. Trimmer bort whitespace.
    const listFragment = document.createDocumentFragment();  // Lager en usynlig beholder i minnet der vi bygger <li> før de settes inn

    const countries = Array.from(this.items.values(), it => it.name);    // Omdann map til array og hent ut alle land fra items
    const searchResults = listElementSearch(countries, searchText);       // Søk etter elementer lagt til i lista

    // Løp igjennom alle land og legg inn resultater i lista under søkefeltet
    for (const item of this.items.values()) {
      if (searchResults.includes(item.name)) {        
        listFragment.appendChild(CountryItem(item)); // Bygger <li>-elementer for valuta og legger det i DocumentFragment
      }
    }
    this.listEl.replaceChildren(listFragment);  // Tømmer lista og legger inn oppdatert liste etter iterering
  }

  async onSubmit(event) {
    event.preventDefault();
    const query = toTitleCase(this.input.value.trim()); //ta input og omdann til TitleCase
    // Sjekker om input allerede er i Map
    // Dette er for å eventuelt avbyte prosedyren slik at vi sparer API-kall ved duplikat
    const key = query.toLowerCase();  // omdanner key til lower-case for å formatere riktig
    if (this.items.has(key)) {        
      this.input.select();        // Hvis duplikat skrevet inn, markeres hele inputten med .select()
      return;                     // stopper prosedyren med return
    }

    try {
       // Hvis ikke duplikat, legges input inn i items
      const item = await this.repository.getCountryData(query); // henter data om søk fra API
      this.items.set(item.name.toLowerCase(), item);    // legger inn resultat i map med "name" : {name: population: growthRatePerSec: }
      this.input.value = "";      // Nullstiller inputverdi
      this.input.focus();         // Flytter markør helt tilbake i søkefeltet
      this.updateCountryList();   // oppdaterer HTML-dokument slik at innholdet i items vises i DOM.
      this.startTicker();         // Starer ticker for å vise "live" vekst etter vekstrate/sekund
    } 
    
    // Hvis land ikke finnes vises alert som forteller bruker at landet er ukjent
    catch (error) {
      if (error?.message === "COUNTRY_NOT_SUPPORTED") {
        alert("Ukjent land. Prøv et annet navn.");
      }
    }
  }

  onDeleteClick(event) {
    const btn = event.target.closest(".delete"); // Finner nærmeste button-element (inkl. seg selv) som matcher selektoren ".delete".
    if (!btn) return;                             // Hvis bruker trykker på andre ting enn btn, så returneres det. Dette er for å ikke få masse "hidden clicks" i consollen

    const li = btn.closest("li");                 // Finner <li>-elementet i DOM-treet fra knappen vi trykket på.
    if (!li) return;                              // Forhindrer "hidden clicks" om bruker trykker på noe annet enn <li>-elementer.

    const { name } = li.dataset;                  // Henter ut navnet på landet i <li>-taggen. Dette brukes til å slette fra Map()
    this.items.delete(name.toLowerCase());

    this.updateCountryList();              // Oppdater lista med land etter sletting

    if (this.items.size === 0) {          // Hvis det ikke er flere land i lista, stopp tickeren
      this.ticker.stop();                 // Stopper ticker hvis lista er tom.
    }
  }
}
