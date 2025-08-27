//src/lib/search.js
export function startsWithWord(element, searchWord) {
  const e = String(element ?? "").toLowerCase();
  const s = String(searchWord ?? "").toLowerCase();
  if (!s) return true;
  return e.startsWith(s);
}

export function filterList(list, searchWord) {
  return list.filter(item => startsWithWord(item, searchWord));
}
