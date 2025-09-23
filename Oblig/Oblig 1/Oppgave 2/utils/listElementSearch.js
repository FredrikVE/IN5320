export function listElementSearch(inputList, searchInput) {
  const result = [];                                  // tom liste for resultater
  const query = searchInput.trim().toLowerCase();     // trimmer input for whitespace og konverterer til lowerCase
  
  // Løper igjennom elementene i inputLista for å sjekke om søke-elementet finnes
  for (const i of inputList) {
    if (i.toLowerCase().startsWith(query)) {    // Hvis inputlisteelement starter med samme som query
      result.push(i);                           // så legges elementet til i resultatlista
    }
  }
  return result;                // returner resultatlista
}



