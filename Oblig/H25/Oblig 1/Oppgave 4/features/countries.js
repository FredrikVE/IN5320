// src/features/countries.js
import { startsWithWord } from "../utils/search.js";
import { CountryItem } from "../components/CountryItem.js";
import { getCountryData } from "../data/countriesRepository.js";
import { ensureTicker, stopTickerIfEmpty } from "../utils/ticker.js";

export function initCountries() {
  const form   = document.getElementById("country-form");
  const input  = document.getElementById("country-input");
  const search = document.getElementById("country-search");
  const listEl = document.getElementById("country-list");
  if (!form || !input || !search || !listEl) return;

  const state = { items: [], filter: "", timer: null };

  const render = () => {
    const nodes = state.items
      .filter(it => startsWithWord(it.name, state.filter))
      .map(CountryItem);
    listEl.replaceChildren(...nodes);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    if (state.items.some(it => it.name.toLowerCase() === q.toLowerCase())) {
      input.value = "";
      render();
      return;
    }
    try {
      const item = await getCountryData(q);
      state.items.push(item);
      input.value = "";
      input.focus();
      render();
      ensureTicker(state, render);
    } catch (err) {
      const msg = err?.message;
      if (msg === "COUNTRY_NOT_SUPPORTED") alert("Ukjent land. Prøv et annet navn.");
      else if (msg !== "EMPTY_QUERY") alert("Kunne ikke hente data fra API-et akkurat nå. Prøv igjen.");
    }
  });

  search.addEventListener("input", () => {
    state.filter = search.value.trim();
    render();
  });

  listEl.addEventListener("click", (e) => {
    const del = e.target instanceof Element ? e.target.closest(".delete") : null;
    if (!del) return;
    const name = del.closest("li")?.dataset?.name;
    if (!name) return;

    state.items = state.items.filter(it => it.name !== name);
    render();
    stopTickerIfEmpty(state);
  });

  render();
}
