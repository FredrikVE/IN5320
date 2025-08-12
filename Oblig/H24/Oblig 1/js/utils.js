export const trim = (s) => (s ?? "").trim();
export const toLower = (s) => s.toLowerCase();

export function startsWithInsensitive(element, searchWord) {
  const a = toLower(trim(element));
  const b = toLower(trim(searchWord));
  if (!b) return true;     // tomt søk matcher alt
  return a.startsWith(b);
}

export function filterByPrefix(list, searchWord) {
  return list.filter((x) => startsWithInsensitive(x.name, searchWord));
}

export function formatInt(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return "-";
  return n.toLocaleString(undefined);
}

export function setStatus(els, msg, isError = false) {
  els.status.textContent = msg || "";
  els.status.style.color = isError ? "#c33" : "#0a6";
}
