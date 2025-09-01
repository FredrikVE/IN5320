//src/utils/currencySearch.js
export function listElementSearch(inputElement, searchInput) {
  const listElement  = String(inputElement).trim().toLowerCase();
  const query = String(searchInput).trim().toLowerCase();

  //hvis liste-elementet starter på søkeinput, returneres true
  return listElement.startsWith(query);
}
