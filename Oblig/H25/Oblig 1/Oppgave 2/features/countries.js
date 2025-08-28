// src/features/countries.js
// Fil som håndterer land-listen (feature-lag)
import { currencySearch } from "../utils/currencySearch.js";                   // Case-insensitivt søk
import { CountryItem } from "../components/CountryItem.js";                    // Bygger ett <li>-element for et land
import { getCountryData } from "../data/countriesRepository.js";               // Henter/normaliserer data fra API
import { startPopulationTicker, stopTickerIfEmpty } from "../utils/ticker.js"; // Start/stop “tikkende” oppdatering
import { toTitleCase } from "../utils/toTitleCase.js";                         // Normaliser input til Title Case

export function initCountries() {                                              // Eksporterer init-funksjonen – kjøres når feature skal settes opp
  const form   = document.getElementById("country-form");                      // Henter <form> for å legge til land
  const input  = document.getElementById("country-input");                     // Henter <input> der brukeren skriver landenavn
  const search = document.getElementById("country-search");                    // Henter <input> for søkefilter
  const listEl = document.getElementById("country-list");                      // Henter <ul> som viser landene
  if (!form || !input || !search || !listEl) return;                           // Avbryt hvis nødvendig markup mangler

  const state = { items: [], filter: "" };                                     // Lokal tilstand: listeelementer og aktivt søkeord

  function render() {                                                          // Renderer (tegner) listen i DOM basert på state og filter
    const frag = document.createDocumentFragment();                            // Effektiv batch-oppdatering (minimerer reflow)
    for (let i = 0; i < state.items.length; i++) {                             // Løper gjennom alle land i state
      const it = state.items[i];                                               // Henter nåværende land-objekt
      if (currencySearch(it.name, state.filter)) {                             // Filtrerer: kun land som matcher søkeordet vises
        frag.appendChild(CountryItem(it));                                     // Bygger <li> for landet og legger det i fragmentet
      }
    }
    listEl.replaceChildren(frag);                                              // Erstatter innholdet i <ul> med det nye fragmentet
  }                                                                            // Slutt på render()

  form.addEventListener("submit", async (e) => {                               // Lytter på “Add”-skjemaet – når brukeren legger til land
    e.preventDefault();                                                        // Hindrer standard form-submit (side-refresh)

    const query = toTitleCase(input.value);                                    // ← normaliser input til Title Case
    if (!query) return;                                                        // Ignorer tom innsendelse

    // Duplikatsjekk (case-insensitiv)
    if (state.items.some(it => (it.name || "").toLowerCase() === query.toLowerCase())) {
      input.select();                                                          // Marker teksten så brukeren ser at det allerede finnes
      return;
    }

    try {                                                                      // Prøver å hente data for landet via repository (kan feile)
      const item = await getCountryData(query);                                // Søk etter data med toTitleCase-input
      if (!item) return;
      state.items.push(item);                                                  // Legger landet inn i state-listen
      input.value = "";                                                        // Tøm inputfeltet
      input.focus();                                                           // Flytt fokus tilbake til input
      render();                                                                // Tegn listen på nytt med det nye elementet
      startPopulationTicker(state, render);                                    // Start tikkeren for å oppdatere tall hvert sekund
    } catch (err) {                                                            // Feilhåndtering dersom repo/nettverk feiler eller landet er ukjent
      const msg = err?.message;
      if (msg === "COUNTRY_NOT_SUPPORTED") {
        alert("Ukjent land. Prøv et annet navn.");                             // Spesifikk beskjed ved ukjent land
      }
    }
  });                                                                          // Slutt på submit-lytter

  search.addEventListener("input", () => {                                     // Lytter på endringer i søkefeltet
    state.filter = search.value.trim();                                        // Oppdaterer filter i state (trimmer mellomrom)
    render();                                                                  // Re-render for å vise/skjule elementer basert på nytt søk
  });
  // Slutt på input-lytter
  
  listEl.addEventListener("click", (e) => {
    const btn  = e.target.closest?.(".delete");
    const name = btn?.closest("li")?.dataset?.name;
    if (!name) return;
    
    state.items = state.items.filter(it => it.name !== name);
    render();
    stopTickerIfEmpty(state);
  });                  
  // Slutt på click-lytter

  render(); // Første render: vis (tom) liste ved init
}
