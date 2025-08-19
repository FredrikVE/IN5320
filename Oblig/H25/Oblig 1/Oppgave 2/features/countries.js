import { startsWithWord } from "../lib/search.js";
import { getCountryData } from "../data/datasource.js";

export function initCountries() {
  let countries = [];
  let tickTimer = null;

  const countryForm   = document.getElementById("country-form");
  const countryInput  = document.getElementById("country-input");
  const countrySearch = document.getElementById("country-search");
  const countryListEl = document.getElementById("country-list");

  const fmt = n => Math.round(n).toLocaleString("no-NO");

  function filterCountryList(list, searchWord){
    return list.filter(x => startsWithWord(x.name, searchWord));
  }

  function render(list){
    countryListEl.innerHTML = "";
    list.forEach(({ name, population, ratePerSec }) => {
      const li = document.createElement("li");
      li.className = "item";

      const title = document.createElement("p");
      title.className = "item-title";
      const badge = ratePerSec === 0
        ? ""
        : `<span class="badge ${ratePerSec < 0 ? "neg" : ""}">
             ${ratePerSec < 0 ? "−" : "+"}${Math.abs(ratePerSec).toFixed(2)}/s
           </span>`;
      title.innerHTML = `<strong>${name}</strong> — <span class="pop">${fmt(population)}</span> ${badge}`;

      const del = document.createElement("button");
      del.className = "delete";
      del.type = "button";
      del.textContent = "X";
      del.setAttribute("aria-label", `Delete ${name}`);

      del.addEventListener("click", () => {
        countries = countries.filter(c => c.name !== name);
        if (countries.length === 0 && tickTimer){
          clearInterval(tickTimer);
          tickTimer = null;
        }
        render(filterCountryList(countries, countrySearch.value.trim()));
      });

      li.append(title, del);
      countryListEl.appendChild(li);
    });
  }

  function ensureTicker(){
    if (tickTimer) return;
    tickTimer = setInterval(() => {
      if (countries.length === 0) return;
      countries.forEach(c => { c.population += c.ratePerSec; });
      render(filterCountryList(countries, countrySearch.value.trim()));
    }, 1000);
  }

  // Legg til land
  countryForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = countryInput.value.trim();
    if (!q) return;

    const result = await getCountryData(q); // navn, population, rate/sek
    if (!result) {
      alert("Ukjent land (eller API-feil). Prøv et annet navn.");
      return;
    }

    // Unngå duplikater
    if (countries.some(c => c.name.toLowerCase() === result.name.toLowerCase())) {
      countryInput.value = "";
      render(filterCountryList(countries, countrySearch.value.trim()));
      return;
    }

    countries.push(result);
    countryInput.value = "";
    render(filterCountryList(countries, countrySearch.value.trim()));
    ensureTicker();
    countryInput.focus();
  });

  // Søk i land
  countrySearch?.addEventListener("input", () => {
    render(filterCountryList(countries, countrySearch.value.trim()));
  });
}
