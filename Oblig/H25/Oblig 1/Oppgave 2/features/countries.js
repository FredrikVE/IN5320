import { listElementSearch } from "../utils/listElementSearch.js";
import { CountryItem } from "../components/countryItem.js";
import { PopulationTicker } from "../utils/ticker.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export class Countries {
  constructor(countriesRepository) {
    this.repository = countriesRepository;

    this.items = new Map();

    // DOM
    this.form = document.getElementById("country-form");
    this.input = document.getElementById("country-input");
    this.search = document.getElementById("country-search");
    this.listEl = document.getElementById("country-list");

    // Ticking
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
    if (this.ticker.timer) return;
    this.ticker.start(() => this.updateCountryList());
  }

  updateCountryList() {
    const searchText = this.search.value.trim();
    const listFragment = document.createDocumentFragment();

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

    if (this.items.has(key)) {
      this.input.select();
      return;
    }

    try {
      const item = await this.repository.getCountryData(query);
      this.items.set(item.name.toLowerCase(), item);
      this.input.value = "";
      this.input.focus();
      this.updateCountryList();
      this.startTicker();
    } 
    
    catch (error) {
      if (error?.message === "COUNTRY_NOT_SUPPORTED") {
        alert("Ukjent land. Prøv et annet navn.");
      }
    }
  }

  onDeleteClick(event) {
    const btn = event.target.closest(".delete");
    if (!btn) return;

    const li = btn.closest("li");
    if (!li) return;

    const { name } = li.dataset;
    this.items.delete(name.toLowerCase());

    this.updateCountryList();              // Oppdater lista med land etter sletting

    if (this.items.size === 0) {          // Hvis det ikke er flere land i lista, stopp tickeren
      this.ticker.stop();                 // stopp ticker
    }
  }
}
