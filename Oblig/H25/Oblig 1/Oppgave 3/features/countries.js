// src/features/countries.js
import { addCurrency as addListItem } from "../components/currencyList.js";
import { startsWithIgnoreCase } from "../utils/search.js";
import { formatPopulation } from "../utils/numberFormat.js";
import { CountryRepository } from "../data/countryRepository.js";
import { createIdGenerator } from "../utils/generateStateID.js"; // hvis du vil ID-er her også

export function initCountries({ genId = createIdGenerator("country") } = {}) {
  const input  = document.getElementById("countryInput");
  const addBtn = document.getElementById("addCountryBtn");
  const search = document.getElementById("countrySearchInput");
  const list   = document.getElementById("countryList");
  if (!input || !addBtn || !search || !list) return;

  const repo = new CountryRepository();
  const state = { items: [] }; // [{ id, name, p0, t0, rate, date }]

  // Hvor mange sekunder har passert siden lokal midnatt for gitt dato (YYYY-MM-DD)
  function secondsSinceLocalMidnight(isoDate) {
    const midnight = new Date(`${isoDate}T00:00:00`);
    const now = new Date();
    return Math.max(0, Math.floor((now - midnight) / 1000));
  }

  // Beregn "nå"-tallet uten å akkumulere avrundingsfeil
  function currentPopulation(it) {
    const elapsedSec = (Date.now() - it.t0) / 1000;
    const val = it.p0 + it.rate * elapsedSec;
    return Math.max(0, Math.round(val));
  }

  function toLabel(it) {
    return `${it.name} - ${formatPopulation(currentPopulation(it))}`;
  }

  function render() {
    const term = search.value || "";
    list.innerHTML = "";
    state.items
      .filter(it => startsWithIgnoreCase(toLabel(it), term))
      .forEach(it => addListItem(list, { ...it, label: toLabel(it) }, {
        onDelete: (item) => {
          const id = item?.id;
          state.items = state.items.filter(x => x.id !== id);
          if (state.items.length === 0 && ticker) {
            clearInterval(ticker);
            ticker = null;
          }
          render();
        }
      }));
  }

  let ticker = null;
  function ensureTicker() {
    if (ticker) return;
    ticker = setInterval(() => {
      if (state.items.length === 0) {
        clearInterval(ticker);
        ticker = null;
        return;
      }
      render();
    }, 1000);
  }

  async function handleAdd() {
    const raw = input.value.trim();
    if (!raw) return;

    addBtn.disabled = true;
    try {
      const res = await repo.getTodayTomorrow(raw);
      if (!res.ok) {
        const msg = res.reason === "unknown-country"
          ? `Ukjent land: "${raw}". Tips: prøv landets engelske navn.`
          : `Fikk ikke data for "${raw}".`;
        alert(msg);
        return;
      }

      const dailyDelta = res.tomorrow.population - res.today.population;
      const rate = dailyDelta / 86400; // per sekund
      // Juster baseline til "nå" innenfor dagens dato
      const pNow = res.today.population + rate * secondsSinceLocalMidnight(res.today.date);

      state.items.push({
        id: genId(),
        name: res.country,
        p0: pNow,       // baseline ved t0
        t0: Date.now(), // starttidspunkt for ticking
        rate,           // personer per sekund
        date: res.today.date,
      });

      input.value = "";
      input.focus();
      render();
      ensureTicker();
    } catch (err) {
      console.error("Population lookup error:", err);
      alert("Noe gikk galt ved henting av befolkningsdata. Prøv igjen.");
    } finally {
      addBtn.disabled = false;
    }
  }

  addBtn.addEventListener("click", handleAdd);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") handleAdd(); });
  search.addEventListener("input", render);

  render();
}
