import { filterByPrefix, formatInt } from "./utils.js";

export function render(els, state, removeItem) {
  const filtered = filterByPrefix(state.items, state.searchWord);
  els.list.innerHTML = "";

  filtered.forEach((item) => {
    const li = document.createElement("li");

    const main = document.createElement("div");
    main.className = "item-main";

    const name = document.createElement("span");
    name.className = "name";
    name.textContent = item.name;

    const pop = document.createElement("span");
    pop.className = "pop";
    pop.dataset.name = item.name;
    pop.textContent =
      item.population != null ? `— ${formatInt(item.population)} people` : "";

    const meta = document.createElement("span");
    meta.className = "meta";
    if (item.population != null && item.ratePerSec != null) {
      meta.textContent = `(~${Math.round(item.ratePerSec)} / sec)`;
    }

    main.appendChild(name);
    if (pop.textContent) main.appendChild(pop);
    if (meta.textContent) main.appendChild(meta);

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.type = "button";
    del.setAttribute("aria-label", `Delete ${item.name}`);
    del.textContent = "×";
    del.addEventListener("click", () => removeItem(item.name));

    li.appendChild(main);
    li.appendChild(del);
    els.list.appendChild(li);
  });

  els.emptyHint.style.display = filtered.length ? "none" : "block";
}

export function updatePopulationSpans(els, state, filterFn) {
  const filtered = filterFn(state.items, state.searchWord);
  filtered.forEach((item) => {
    const span = els.list.querySelector(
      `.pop[data-name="${CSS.escape(item.name)}"]`
    );
    if (span) {
      span.textContent =
        item.population != null ? `— ${formatInt(item.population)} people` : "";
    }
  });
}
