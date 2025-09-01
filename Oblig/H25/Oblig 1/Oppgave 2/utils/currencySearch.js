//src/utils/currencySearch.js
export function currencySearch(listelement, searchInput) {
  const currency  = String(listelement).trim().toLowerCase();
  const query = String(searchInput).trim().toLowerCase();

  //hvis liste-elementet starter på søkeinput, returneres true
  return currency.startsWith(query);
}
