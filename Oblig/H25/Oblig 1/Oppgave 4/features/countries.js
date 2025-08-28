// src/features/countries.js
import { startsWithWord } from "../utils/search.js";
import { CountryItem } from "../components/CountryItem.js";
import { getCountryData } from "../data/countriesRepository.js";

export function initCountries() {
  const form   = document.getElementById("country-form");
  const input  = document.getElementById("country-input");
  const search = document.getElementById("country-search");
  const listEl = document.getElementById("country-list");

  // Enkel guard: gjør ingenting hvis markup mangler (samme stil som currency)
  if (!form || !input || !search || !listEl) return;

  const state = { items: [], filter: "", timer: null };

  function ensureTicker() {
    if (state.timer || state.items.length === 0) return;
    state.timer = setInterval(() => {
      for (const it of state.items) {
        const rate = (it.growthRatePerSec ?? it.ratePerSec ?? 0);
        it.population += rate;
      }
      render();
    }, 1000);
  }
  function stopTickerIfEmpty() {
    if (state.items.length === 0 && state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
  }

  function render() {
    const frag = document.createDocumentFragment();
    const filtered = state.filter
      ? state.items.filter(it => startsWithWord(it.name, state.filter))
      : state.items;

    for (const it of filtered) {
      const viewItem = { ...it, ratePerSec: it.growthRatePerSec ?? it.ratePerSec ?? 0 };
      frag.appendChild(CountryItem(viewItem));
    }
    listEl.replaceChildren(frag);
  }

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
      ensureTicker();
    } catch (err) {
      const code = err?.message;
      if (code === "COUNTRY_NOT_SUPPORTED") {
        alert("Ukjent land (eller API returnerte tomt svar). Prøv et annet navn.");
      } else if (code === "EMPTY_QUERY") {
        // ignorer
      } else {
        alert("Kunne ikke hente data fra API-et akkurat nå. Prøv igjen.");
      }
    }
  });

  search.addEventListener("input", () => {
    state.filter = search.value.trim();
    render();
  });

  listEl.addEventListener("click", (e) => {
    const btn = e.target instanceof Element ? e.target.closest(".delete") : null;
    if (!btn) return;
    const li = btn.closest("li");
    const name = li?.dataset?.name;
    if (!name) return;

    state.items = state.items.filter(it => it.name !== name);
    render();
    stopTickerIfEmpty();
  });

  render();
}
