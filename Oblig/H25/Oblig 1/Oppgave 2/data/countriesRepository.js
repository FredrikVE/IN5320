// src/data/countriesRepository.js
import { fetchPopTodayTomorrowRaw } from "./countriesDatasource.js";

const DAY_SECONDS = 86_400;

export async function getCountryData(countryName) {
  const query = String(countryName ?? "").trim();
  if (!query) return null; // tom input: ikke kall API, bare no-op

  const population = await fetchPopTodayTomorrowRaw(query);
  const populationArray = population?.total_population;

  if (!Array.isArray(populationArray) || populationArray.length < 2) {
    throw new Error("COUNTRY_NOT_SUPPORTED"); // returnerer tom/feil ved ukjent land
  }

  const today = Number(populationArray[0].population);
  const tomorrow = Number(populationArray[1].population);

  return {
    name: query,
    population: today,
    growthRatePerSec: (tomorrow - today) / DAY_SECONDS,
  };
}
