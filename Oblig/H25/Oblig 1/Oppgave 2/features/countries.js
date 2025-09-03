import { listElementSearch } from "../utils/listElementSearch.js";
import { CountryItem } from "../components/countryItem.js";
import { PopulationTicker } from "../utils/ticker.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export class Countries {
  constructor(countriesRepository) {
    this.repository = countriesRepository;

    // Bruk Map for å unngå duplikater i lista
    this.items = new Map(); // key: name.toLowerCase(), value: country object

    // DOM
    this.form = document.getElementById("country-form");
    this.input = document.getElementById("country-input");
    this.search = document.getElementById("country-search");
    this.listEl = document.getElementById("country-list");

    // Ticking
    this.tickInterval = 1000;
    this.updateInterval = null;
    this.ticker = new PopulationTicker(this.items);

    this.setupEventListeners();
    this.updateCountryList();
  }

  setupEventListeners() {
    this.form.addEventListener("submit", (event) => this.onSubmit(event));
    this.search.addEventListener("input", () => this.updateCountryList());
    this.listEl.addEventListener("click", (event) => this.onDeleteClick(event));
  }

  startTicker() {
    if (this.updateInterval) return; // Hvis ticker allerede i gang, ikke forstyrr

    if (!this.ticker.isRunning()) {
      // Sett i gang oppdateringsintervall
      this.updateInterval = setInterval(() => {
        this.ticker.tick();           // oppdater data
        this.updateCountryList();     // render
      }, this.tickInterval);

      // Send timerId inn som parameter til tickeren
      this.ticker.start(this.updateInterval);
    }
  }

  updateCountryList() {
    const searchText = this.search.value.trim();
    const listFragment = document.createDocumentFragment();

    // listElementSearch forventer en array av navn
    const countries = Array.from(this.items.values(), it => it.name);
    const searchResults = listElementSearch(countries, searchText);

    for (const item of this.items.values()) {
      if (searchResults.includes(item.name)) {
        listFragment.appendChild(CountryItem(item));
      }
    }
    this.listEl.replaceChildren(listFragment);
  }

  async onSubmit(event) {
    event.preventDefault();
    const query = toTitleCase(this.input.value.trim());
    const key = query.toLowerCase();

    // Duplikatsjekk via Map
    if (this.items.has(key)) {
      this.input.select();
      return;
    }

    try {
      const item = await this.repository.getCountryData(query);
      this.items.set(item.name.toLowerCase(), item); // legg inn
      this.input.value = "";
      this.input.focus();
      this.updateCountryList();
      this.startTicker(); // starter hvis ikke i gang
    } 
    
    catch (error) {
      if (error?.message === "COUNTRY_NOT_SUPPORTED") {
        alert("Ukjent land. Prøv et annet navn.");
      }
    }
  }

  onDeleteClick(event) {
    const btn = event.target.closest(".delete");
    if (!btn) return; // liten guard i tilfelle klikk andre steder

    const li = btn.closest("li");
    if (!li) return;

    const { name } = li.dataset;          // antatt display-navn
    this.items.delete(name.toLowerCase());

    this.updateCountryList();

    if (this.items.size === 0) {
      this.ticker.stop();                 // stopp tickeren hvis lista er tom
      this.updateInterval = null;         // nullstill vår referanse
    }
  }
}
