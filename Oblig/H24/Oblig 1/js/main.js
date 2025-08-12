import { state, els } from "./state.js";
import { trim, toLower, filterByPrefix, setStatus } from "./utils.js";
import { render } from "./render.js";
import { fetchTodayAndTomorrow, calcRatePerSec } from "./api.js";
import { startTicking, stopTicking } from "./ticking.js";

// --- Mutators ---------------------------------------------------------------
function addItemLocal(name, population = null, ratePerSec = null) {
  if (state.items.some((x) => toLower(x.name) === toLower(name))) {
    setStatus(els, `"${name}" is already in the list.`);
    return false;
  }
  state.items.push({ name, population, ratePerSec });
  setStatus(els, `Added "${name}".`);
  render(els, state, removeItem);
  return true;
}

function removeItem(name) {
  const before = state.items.length;
  state.items = state.items.filter((x) => toLower(x.name) !== toLower(name));
  if (state.items.length < before) {
    setStatus(els, `Removed "${name}".`);
    render(els, state, removeItem);
  }
}

async function addItemWithPopulation(name) {
  try {
    const { today, tomorrow } = await fetchTodayAndTomorrow(name);
    if (today == null || tomorrow == null) {
      setStatus(els, `"${name}" is not recognized by the population API.`, true);
      return;
    }
    const ratePerSec = calcRatePerSec(today, tomorrow);
    addItemLocal(name, today, ratePerSec);
  } catch (err) {
    console.error(err);
    setStatus(els, `Could not fetch population for "${name}".`, true);
  }
}

// --- Events -----------------------------------------------------------------
els.addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = trim(els.countryInput.value);
  if (!name) {
    setStatus(els, "Please enter a country name.", true);
    return;
  }

  if (els.optPopulation.checked) await addItemWithPopulation(name);
  else addItemLocal(name);

  els.countryInput.value = "";
  els.countryInput.focus();
});

els.searchInput.addEventListener("input", (e) => {
  state.searchWord = e.target.value || "";
  render(els, state, removeItem);
});

els.optTick.addEventListener("change", () => {
  if (els.optTick.checked) startTicking(state, els, filterByPrefix);
  else stopTicking(state);
});

// Første render
render(els, state, removeItem);
