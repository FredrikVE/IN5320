// src/features/countries.js
import { listElementSearch } from "../utils/listElementSearch.js";
import { CountryItem } from "../components/countryItem.js";
import { CountriesRepository } from "../data/countriesRepository.js";
import { startPopulationTicker, stopTickerIfEmpty } from "../utils/ticker.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export function countries() {
  const form = document.getElementById("country-form");
  const input = document.getElementById("country-input");
  const search = document.getElementById("country-search");
  const listEl = document.getElementById("country-list");

  //oppretter nytt repository som henter data fra API
  const countriesRepository = new CountriesRepository();

  // En state med items fra API-et
  const state = { items: [] };

  function updateCountryList() {
    // les filter direkte fra DOM (tom streng hvis ikke skrevet noe)
    const searchText = search.value.trim();
    const listFragment = document.createDocumentFragment();
    const countries = state.items.map(it => it.name);
    const searchResults = listElementSearch(countries, searchText);

    for (const country of state.items) {
      if (searchResults.includes(country.name)) {
        listFragment.appendChild(CountryItem(country));
      }
    }
    listEl.replaceChildren(listFragment);
  }

  // Event-listerner for Add country-knapp
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = toTitleCase(input.value.trim());

    // Duplikatsjekk. Samme land skal kun legges til én gang
    if (state.items.some(it => it.name.toLowerCase() === query.toLowerCase())) {
      input.select();
      return;
    }

    // try/catch-blokk for å lytte etter eventuelle feilmelinger fra CountriesRepository()
    try {
      const item = await countriesRepository.getCountryData(query);
      state.items.push(item);   // legger inn resultat i liste.
      input.value = "";         // nullstiller inputfelt etter bruk
      input.focus();            // flytter markøren tilbake til start etter bruk
      updateCountryList();      // Oppdaterer listas innhold slik at det rendres inn på siden
      startPopulationTicker(state, updateCountryList); // Starter tickerfunksjonen som teller befolkningsøkning
    }

    // Fanger eventuelle feil og viser en alert til bruker dersom land ikke finnes
    catch (error) {
      if (error?.message === "COUNTRY_NOT_SUPPORTED") {
        alert("Ukjent land. Prøv et annet navn.");
      } 
    }
  });

  // ingen state-oppdatering; bare trigge re-render når brukeren skriver
  search.addEventListener("input", updateCountryList);

  listEl.addEventListener("click", (event) => {
    const btn = event.target.closest(".delete");                  // Finner nærmeste element med klassen .delete
    const li = btn.closest("li");                                 // Finner <li>-elementet som knappen ligger inni
    const { name } = li.dataset;                                  // Leser ut landnavnet vi lagret i data-name på <li>
    state.items = state.items.filter(it => it.name !== name);     // Fjerner landet fra state ved å filtrere bort matchet navn
    updateCountryList();     // Oppdaterer lista etter sletting
    stopTickerIfEmpty(state); // stopper tickeren hvis lista er tom
  });
}
