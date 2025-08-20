// src/data/countriesApi.js
import { API_BASE } from "./baseUrl";

export function buildCountriesUrl({ page, pageSize, search, continents, order }) {
  const p = new URLSearchParams();
  p.set("page", page);
  p.set("pageSize", pageSize);
  if (search && search.trim()) p.set("search", search.trim());
  if (continents?.length) p.set("Continent", continents.join(","));
  if (order) p.set("order", order)       //utvid for sortering
  return `${API_BASE}?${p.toString()}`;
}
