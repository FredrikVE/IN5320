//src/utils/search.js

/** 
* Normaliser tekst for case-insensitive søk (og fjerner aksenter/diakritikk) 
*/
export function normalize(str) {
  return (str ?? "")
    .toString()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // fjern diakritikk
    .trim()
    .toLowerCase();
}

/**
 * A) startsWith – returnerer true hvis `element` starter med `searchWord`.
 * Case-insensitiv, tomt søkeord matcher alt.
 */
export function startsWithIgnoreCase(element, searchWord) {
  const el = normalize(element);
  const sw = normalize(searchWord);
  if (sw === "") return true;
  return el.startsWith(sw);
}

/**
 * B) filter – returnerer ny liste med elementer som starter med `searchWord`.
 * Bruker funksjonen fra A for sjekken.
 */
export function filterByPrefix(list, searchWord) {
  if (!Array.isArray(list)) return [];
  return list.filter(item => startsWithIgnoreCase(item, searchWord));
}
