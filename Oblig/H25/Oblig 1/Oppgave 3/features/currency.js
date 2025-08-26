//src/features/currency.js
import { addCurrency } from "../components/currencyList.js";
import { startsWithIgnoreCase } from "../utils/search.js";
import { handleAdd } from "./handlers/add.js";
import { handleDelete } from "./handlers/delete.js";
import { createIdGenerator } from "../utils/generateStateID.js"; // fallback

export function initCurrency({ genId } = {}) {
  const input  = document.getElementById("currencyInput");
  const addBtn = document.getElementById("addBtn");
  const search = document.getElementById("searchInput");
  const list   = document.getElementById("currencyList");
  if (!input || !addBtn || !list || !search) return;

  const state = { items: [] };

  // bruk injisert generator, eller lag en lokal som fallback
  const idGen = genId ?? createIdGenerator("cur");

  function render() {
    const term = search.value || "";
    list.innerHTML = "";
    state.items
      .filter(it => startsWithIgnoreCase(it.label, term))
      .forEach(it =>
        addCurrency(list, it, {
          onDelete: (item) => handleDelete(item, state, render)
        })
      );
  }

  addBtn.addEventListener("click", () => handleAdd(input, state, idGen, render));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAdd(input, state, idGen, render);
  });
  search.addEventListener("input", render);

  render();
}
