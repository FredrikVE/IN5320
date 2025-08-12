//src/data/countriesApi.js
import { API_BASE } from "./apiBase";

export function buildCountriesUrl({ page, pageSize, search, order, continents }) {
  const p = new URLSearchParams();
  p.set("page", page);
  p.set("pageSize", pageSize);
  if (search?.trim()) p.set("search", search.trim());
  if (order) p.set("order", order);
  if (continents?.length) p.set("Continent", continents.join(","));
  return `${API_BASE}?${p.toString()}`;
}

export async function fetchCountries(params) {
  const url = buildCountriesUrl(params);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json(); // { pager, results }
}

export async function fetchAllCountryNames() {
  const res = await fetch(`${API_BASE}?paging=false&order=Country:ASC`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return (json.results || []).map(r => r.Country).filter(Boolean);
}
