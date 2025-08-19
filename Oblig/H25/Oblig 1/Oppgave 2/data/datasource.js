const REST_COUNTRIES_BASE = "https://restcountries.com/v3.1/name/";
const POP_IO_BASE         = "https://d6wn6bmjj722w.population.io/1.0/population/";

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// Navn + total befolkning (statisk)
export async function fetchPopulation(countryName) {
  try {
    const url =
      `${REST_COUNTRIES_BASE}${encodeURIComponent(countryName)}` +
      `?fullText=true&fields=name,population`;
    const data = await fetchJSON(url);
    if (!Array.isArray(data) || data.length === 0 || data.status) return null;
    const m = data[0];
    return { name: m.name.common, population: m.population };
  } catch {
    return null;
  }
}

// Dagens vs. i morgen → rate per sekund
export async function fetchDailyRate(countryName) {
  try {
    const url =
      `${POP_IO_BASE}${encodeURIComponent(countryName)}/today-and-tomorrow/`;
    const data = await fetchJSON(url, { headers: { Accept: "application/json" }});
    if (!data || !Array.isArray(data.total_population) || data.total_population.length < 2) {
      return 0;
    }
    const today    = Number(data.total_population[0].population);
    const tomorrow = Number(data.total_population[1].population);
    const delta = tomorrow - today;
    return delta / 86400; // per sekund
  } catch {
    return 0;
  }
}

// Samlekall for bekvemmelighet
export async function getCountryData(countryName) {
  const [info, rate] = await Promise.all([
    fetchPopulation(countryName),
    fetchDailyRate(countryName),
  ]);
  if (!info) return null;
  return {
    name: info.name,
    population: Number(info.population),
    ratePerSec: Number(rate) || 0,
  };
}
