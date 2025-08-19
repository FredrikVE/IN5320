export function startsWithWord(element, searchWord) {
  if (!searchWord) return true; // tomt søk = alt matcher
  return element.toLowerCase().startsWith(searchWord.toLowerCase());
}

export function filterList(list, searchWord) {
  return list.filter(item => startsWithWord(item, searchWord));
}
