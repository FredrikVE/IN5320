import { filterList } from "../lib/search.js";

export function initCurrency() {
  let currencies = ["Euro", "Norwegian Kroner", "Canadian Dollar", "Ukrainian Hryvnia", "Australian Dollar"];

  const listEl        = document.getElementById("currency-list");
  const addForm       = document.getElementById("add-form");
  const currencyInput = document.getElementById("currency-input");
  const searchInput   = document.getElementById("search-input");

  function render(list) {
    listEl.innerHTML = "";
    list.forEach(name => {
      const li = document.createElement("li");
      li.className = "item";

      const title = document.createElement("p");
      title.className = "item-title";
      title.textContent = name;

      const del = document.createElement("button");
      del.className = "delete";
      del.type = "button";
      del.setAttribute("aria-label", `Delete ${name}`);
      del.textContent = "X";

      del.addEventListener("click", () => {
        const idx = currencies.indexOf(name);
        if (idx > -1) currencies.splice(idx, 1);
        render(filterList(currencies, searchInput.value.trim()));
      });

      li.append(title, del);
      listEl.appendChild(li);
    });
  }

  addForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = currencyInput.value.trim();
    if (!value) return;
    currencies.push(value);
    currencyInput.value = "";
    render(filterList(currencies, searchInput.value.trim()));
    currencyInput.focus();
  });

  searchInput?.addEventListener("input", () => {
    render(filterList(currencies, searchInput.value.trim()));
  });

  render(currencies);
}
