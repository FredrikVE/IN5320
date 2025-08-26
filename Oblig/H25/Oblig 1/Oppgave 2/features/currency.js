//src/features/currency.js
import { filterList } from "../lib/search.js";
import { must } from "../lib/dom.js";
import { initCurrenciesRepo, getCurrencies, addCurrency, removeCurrency } from "../data/currencyRepository.js";

export function initCurrency() {
  var DEFAULTS = ["Euro", "Norwegian Kroner", "Canadian Dollar", "Ukrainian Hryvnia", "Australian Dollar"];

  var listEl        = must("currency-list");
  var addForm       = must("add-form");
  var currencyInput = must("currency-input");
  var searchInput   = must("search-input");

  initCurrenciesRepo(DEFAULTS);

  function render() {
    var all = getCurrencies();
    var q = (searchInput.value || "").trim();
    var list = filterList(all, q);

    var frag = document.createDocumentFragment();
    var i;
    for (i = 0; i < list.length; i++) {
      var name = list[i];
      var li = document.createElement("li");
      li.className = "item";
      li.dataset.name = name;
      li.innerHTML =
        '<p class="item-title">' + name + '</p>' +
        '<button class="delete" type="button" aria-label="Delete ' + name + '">X</button>';
      frag.appendChild(li);
    }
    listEl.innerHTML = "";
    listEl.appendChild(frag);
  }

  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = (currencyInput.value || "").trim();
    if (!value) return;
    addCurrency(value);        // repo håndterer duplikater
    currencyInput.value = "";
    render();
    currencyInput.focus();
  });

  searchInput.addEventListener("input", function () {
    render();
  });

  listEl.addEventListener("click", function (e) {
    var target = e.target;
    if (!(target instanceof Element)) return;
    var btn = target.closest(".delete");
    if (!btn) return;

    var li = btn.closest("li");
    var name = li && li.dataset ? li.dataset.name : null;
    if (!name) return;

    removeCurrency(name);
    render();
  });

  render();
}
