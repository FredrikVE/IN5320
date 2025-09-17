//src/data/urlParameterBuilder.js
import { BASE_URL } from "./baseUrl";

export function buildSearchParametersURL({ page, pageSize, search, continents, order }) {
  let url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&paging=true`;

  // Legger til søkeparameter på URL hvis parameteret ikke er tomt
  const searchTerm = search.trim(); // Trimmer vekk potensiell white space
  if (searchTerm) {
    url += `&search=${encodeURIComponent(searchTerm)}`;
  }

  // Utvider ULR med kontinentsøkt hvis det finnes ett eller flere valgte kontinenter
  const continentList = continents;
  if (continentList.length) {
    url += `&Continent=${continentList.map(encodeURIComponent).join(",")}`;
  }

  // Utvider URL med sortering hvis dette ikke er tom. f.eks. "Population:DESC"
  const sortOrder = order.trim();
  if (sortOrder) {
    url += `&order=${encodeURIComponent(sortOrder)}`;
  }

  // Returnerer API-URL bygget etter ønskede parametere
  return url;
}
