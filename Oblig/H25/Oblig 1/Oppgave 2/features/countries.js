import { listElementSearch } from "../utils/listElementSearch.js";
import { CountryItem } from "../components/countryItem.js";
import { CountriesRepository } from "../data/countriesRepository.js";
import { startPopulationTicker, stopTickerIfEmpty } from "../utils/ticker.js";
import { toTitleCase } from "../utils/toTitleCase.js";

export function countries() {

  // Henter referanser fra HTML-dokumentene for bruk i js-koden
  const form = document.getElementById("country-form");
  const input = document.getElementById("country-input");
  const search = document.getElementById("country-search");
  const listEl = document.getElementById("country-list");

  //oppretter nytt repository som henter data fra API
  const countriesRepository = new CountriesRepository();

  // En state med items fra API-et.
  const state = { items: [] };

  function updateCountryList() {
    // les filter direkte fra DOM (tom streng hvis ikke skrevet noe)
    const searchText = search.value.trim();  // Henter inputtekst for søking. Trimmer bort whitespace.
    const listFragment = document.createDocumentFragment(); // Lager en usynlig beholder i minnet der vi bygger <li> før de settes inn
    const countries = state.items.map(it => it.name); // Henter navnene på landene i state.items
    const searchResults = listElementSearch(countries, searchText);  //søk etter elementer lagt til i lista

    // Løp igjennom alle land i state-lista
    for (const country of state.items) { 
      if (searchResults.includes(country.name)) {  // Hvis søkeresultatet er i søketreffet
        listFragment.appendChild(CountryItem(country)); // Bygg <li> for landet og legg det i DocumentFragment
      }
    }
    listEl.replaceChildren(listFragment); //tømmer lista og legger inn oppdatert liste for hver gang
  }

  // Event-listerner for Add country-knapp
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = toTitleCase(input.value.trim()); //Konverter input til titleCase før input

    // Duplikatsjekk. Sjekker om samme land allerede finnnes i lista.
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
    const btn = event.target.closest(".delete");    // Finner nærmeste button-element (inkl. seg selv) som matcher selektoren ".delete".
    const li = btn.closest("li");                   // Finner <li>-elementet i DOM-treet fra knappen vi trykket på.
    const { name } = li.dataset;                    // Henter ut landet i <li>-taggen. Dette brukes til å slette med filter
    const newList = state.items.filter(it => it.name !== name);     // Fjerner slettet element ved å filtrer det bort fr gammel liste
    state.items = newList;                                          // Oppdaterer gammel liste til å være den nye filtrerte listen
    updateCountryList();     // Oppdaterer lista etter sletting
    stopTickerIfEmpty(state); // stopper tickeren hvis lista er tom
  });
}
