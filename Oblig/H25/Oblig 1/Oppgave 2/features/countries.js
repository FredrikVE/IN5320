//src/features/countries.js
import { startsWithWord } from "../lib/search.js";
import { must } from "../lib/dom.js";
import { getCountryData } from "../data/countriesRepository.js";

export function initCountries() {
  function fmt(n) { return Math.round(n).toLocaleString("no-NO"); }

  var form   = must("country-form");
  var input  = must("country-input");
  var search = must("country-search");
  var listEl = must("country-list");

  var state = { items: [], filter: "", timer: null };

  function render() {
    var frag = document.createDocumentFragment();
    var filtered = state.items.filter(function (x) {
      return startsWithWord(x.name, state.filter);
    });

    for (var i = 0; i < filtered.length; i++) {
      var item = filtered[i];
      var li = document.createElement("li");
      li.className = "item";
      li.dataset.name = item.name;

      var badge = "";
      if (item.ratePerSec) {
        badge =
          '<span class="badge ' + (item.ratePerSec < 0 ? "neg" : "") + '">' +
          (item.ratePerSec < 0 ? "−" : "+") + Math.abs(item.ratePerSec).toFixed(2) +
          '/s</span>';
      }

      li.innerHTML =
        '<p class="item-title">' +
          '<strong>' + item.name + '</strong> — ' +
          '<span class="pop">' + fmt(item.population) + '</span> ' +
          badge +
        '</p>' +
        '<button class="delete" type="button" aria-label="Delete ' + item.name + '">X</button>';

      frag.appendChild(li);
    }

    listEl.innerHTML = "";
    listEl.appendChild(frag);
  }

  function startTicker() {
    if (state.timer || state.items.length === 0) return;
    state.timer = setInterval(function () {
      var i;
      for (i = 0; i < state.items.length; i++) {
        state.items[i].population += state.items[i].ratePerSec;
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

  // legg til land – én try/catch pga repository kaster ved feil
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q) return;

    // unngå duplikater
    var lower = q.toLowerCase();
    for (var i = 0; i < state.items.length; i++) {
      if (state.items[i].name.toLowerCase() === lower) {
        input.value = "";
        render();
        return;
      }
    }

    getCountryData(q)
      .then(function (result) {
        state.items.push(result);
        input.value = "";
        render();
        startTicker();
        input.focus();
      })
      .catch(function (err) {
        alert("Ukjent land eller API-feil (" + err.message + "). Prøv et annet navn.");
      });
  });

  // søk
  search.addEventListener("input", function () {
    state.filter = search.value.trim();
    render();
  });

  // slett (uten srcElement)
  listEl.addEventListener("click", function (e) {
    var target = e.target;
    if (!(target instanceof Element)) return;
    var btn = target.closest(".delete");
    if (!btn) return;

    var li = btn.closest("li");
    var name = li && li.dataset ? li.dataset.name : null;
    if (!name) return;

    state.items = state.items.filter(function (c) { return c.name !== name; });
    render();
    stopTickerIfEmpty();
  });
}
