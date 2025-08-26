//src/features/countries.js
import { addCurrency as addListItem } from "../components/currencyList.js";
import { startsWithIgnoreCase } from "../utils/search.js";
import { formatPopulation } from "../utils/format.js";
import { CountryRepository } from "../repositories/countryRepository.js";
import { createIdGenerator } from "../utils/generateStateID.js"; // hvis du vil ID-er her også

export function initCountries({ genId = createIdGenerator("country") } = {}) {
  const input  = document.getElementById("countryInput");
  const addBtn = document.getElementById("addCountryBtn");
  const search = document.getElementById("countrySearchInput");
  const list   = document.getElementById("countryList");
  if (!input || !addBtn || !search || !list) return;

  const repo = new CountryRepository();
  const state = { items: [] }; // [{ id, name, population }]

  function toLabel(it) {
    return `${it.name} - ${formatPopulation(it.population)}`;
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
          render();
        }
      }));
  }

  async function handleAdd() {
    const raw = input.value.trim();
    if (!raw) return;

    addBtn.disabled = true;
    try {
      const res = await repo.getPopulationToday(raw);
      if (!res.ok) {
        const msg = res.reason === "unknown-country"
          ? `Ukjent land: "${raw}". Tips: prøv landets engelske navn.`
          : `Fikk ikke data for "${raw}".`;
        alert(msg);
        return;
      }

      state.items.push({
        id: genId(),
        name: res.country,
        population: res.population,
        date: res.date,
      });

      input.value = "";
      input.focus();
      render();
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
