// src/features/countries.js
import { listElementSearch } from "../utils/listElementSearch.js";
import { CountryItem } from "../components/CountryItem.js";
import { getCountryData } from "../data/countriesRepository.js";
import { startPopulationTicker, stopTickerIfEmpty } from "../utils/ticker.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export function initCountries() {
  const form   = document.getElementById("country-form");
  const input  = document.getElementById("country-input");
  const search = document.getElementById("country-search");
  const listEl = document.getElementById("country-list");

  // fjernet filter fra state
  const state = { items: [] };

  function render() {
    // les filter direkte fra DOM (tom streng hvis ikke skrevet noe)
    const searchText = search.value.trim();
    const listFragment = document.createDocumentFragment();

    for (let i = 0; i < state.items.length; i++) {
      const it = state.items[i];
      if (listElementSearch(it.name, searchText)) {
        listFragment.appendChild(CountryItem(it));
      }
    }
    listEl.replaceChildren(listFragment);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = toTitleCase(input.value);
    if (!query) return;

    // duplikatsjekk (case-insensitiv)
    if (state.items.some(it => it.name.toLowerCase() === query.toLowerCase())) {
      input.select();
      return;
    }

    try {
      const item = await getCountryData(query);
      if (!item) return;
      state.items.push(item);

      input.value = "";
      input.focus();
      render();
      startPopulationTicker(state, render);

    } 
    catch (error) {
      if (error?.message === "COUNTRY_NOT_SUPPORTED") {
        alert("Ukjent land. Prøv et annet navn.");
      } else {
        console.error(error);
      }
    }
  });

  // ingen state-oppdatering; bare trigge re-render når brukeren skriver
  search.addEventListener("input", render);

  listEl.addEventListener("click", (event) => {
    const btn = event.target.closest(".delete");
    if (!btn) return;

    const li = btn.closest("li");
    if (!li) return;

    const { name } = li.dataset;
    if (!name) return;

    state.items = state.items.filter(it => it.name !== name);
    render();
    stopTickerIfEmpty(state);
  });

  // init-render (synk UI ved oppstart)
  render();
}
