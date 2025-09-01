//src/utils/currencySearch.js
export function listElementSearch(inputList, searchInput) {
  const query = searchInput.trim().toLowerCase();
  const result = [];

  for (const i of inputList) {
    if (i.toLowerCase().startsWith(query)) {
      result.push(i);
    }
  }
  return result;
}



