//src/utils/currencySearch.js
export function currencySearch(element, searchWord) {
  const e = String(element || "").toLowerCase();
  const s = String(searchWord || "").toLowerCase();
  if (!s) return true;
  return e.startsWith(s);
}
