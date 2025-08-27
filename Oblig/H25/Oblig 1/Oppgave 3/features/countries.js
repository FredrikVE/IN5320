import { addCurrency as addListItem } from "../components/currencyList.js";
import { startsWithIgnoreCase } from "../utils/search.js";
import { createIdGenerator } from "../utils/generateStateID.js";

import { toLabel } from "../utils/countryCalc.js";
import { handleAddCountry } from "./handlers/addCountry.js";
import { handleDeleteCountry } from "./handlers/deleteCountry.js";
import { createListTicker } from "./ticker.js";

export function initCountries({ genId = createIdGenerator("country") } = {}) {
  const input  = document.getElementById("countryInput");
  const addBtn = document.getElementById("addCountryBtn");
  const search = document.getElementById("countrySearchInput");
  const list   = document.getElementById("countryList");
  if (!input || !addBtn || !search || !list) return;

  const state = { items: [] };

  function render() {
    const term = search.value || "";
    list.innerHTML = "";

    state.items
      .filter(it => startsWithIgnoreCase(toLabel(it), term))
      .forEach(it => {
        const label = toLabel(it); // recompute for ticking
        addListItem(list, { ...it, label }, {
          onDelete: (item) => handleDeleteCountry(item, state, render, ticker),
        });
      });
  }

  const ticker = createListTicker(state, render, 1000);

  const add = () => handleAddCountry({
    input,
    addBtn,
    state,
    genId,
    render,
    ticker,
  });

  addBtn.addEventListener("click", add);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") add(); });
  search.addEventListener("input", render);

  render();
}
