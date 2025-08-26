//src/data/currencyRepository.js
var CURRENCY_KEY = "currencies_v1";

// Fallback i minne hvis localStorage ikke er tilgjengelig (privat modus, sandbox, etc.)
var STORAGE_OK = (function () {
  try {
    var t = "__test_currency_repo__";
    localStorage.setItem(t, "1");
    localStorage.removeItem(t);
    return true;
  } catch (e) {
    return false;
  }
})();
var memStore = []; // brukes hvis STORAGE_OK === false

function readStore() {
  if (!STORAGE_OK) return memStore.slice();
  try {
    var raw = localStorage.getItem(CURRENCY_KEY);
    if (!raw) return [];
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice() : [];
  } catch (e) {
    return [];
  }
}

function writeStore(list) {
  var copy = Array.isArray(list) ? list.slice() : [];
  if (!STORAGE_OK) {
    memStore = copy;
    return;
  }
  try {
    localStorage.setItem(CURRENCY_KEY, JSON.stringify(copy));
  } catch (e) {
    // fallback til minne dersom lagring feiler
    memStore = copy;
  }
}

/** Init med defaults første gang (ignorerer hvis noe finnes fra før) */
export function initCurrenciesRepo(defaults) {
  var current = readStore();
  if (!current || current.length === 0) {
    writeStore([].concat(defaults || []));
  }
}

/** Hent alle (returnerer kopi) */
export function getCurrencies() {
  return readStore();
}

/** Legg til (case-insensitive duplikatsjekk) */
export function addCurrency(name) {
  var n = String(name || "").trim();
  if (!n) return readStore();

  var list = readStore();
  var lower = n.toLowerCase();
  for (var i = 0; i < list.length; i++) {
    if (String(list[i]).toLowerCase() === lower) {
      return list; // finnes allerede
    }
  }

  list.push(n);
  writeStore(list);
  return list;
}

/** Fjern eksakt match (case-sensitive fjerning) */
export function removeCurrency(name) {
  var target = String(name || "");
  var list = readStore().filter(function (x) { return x !== target; });
  writeStore(list);
  return list;
}
