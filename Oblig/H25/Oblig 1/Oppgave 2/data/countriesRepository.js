//src/data/countriesRepository.js
import { fetchCountryRaw, fetchPopTodayTomorrowRaw } from "./countriesDatasource.js";

const SECONDS_PER_DAY = 86400;

function pickFirstCountry(arr) {
  if (Array.isArray(arr) && arr.length > 0) return arr[0];
  throw new Error("COUNTRY_NOT_FOUND"); // én tydelig feilkode
}

function extractRatePerSec(popData) {
  const arr = popData && Array.isArray(popData.total_population)
    ? popData.total_population
    : [];
  if (arr.length < 2) throw new Error("POP_DATA_MISSING");

  const today    = Number(arr[0].population) || 0;
  const tomorrow = Number(arr[1].population) || 0;
  return (tomorrow - today) / SECONDS_PER_DAY;
}

/** Hoved-API: kast ved feil, gi stabilt resultat ved suksess */
export async function getCountryData(countryName) {
  const q = String(countryName || "").trim();
  if (!q) throw new Error("EMPTY_QUERY");

  const [rawCountry, pop] = await Promise.all([
    fetchCountryRaw(q),
    fetchPopTodayTomorrowRaw(q),
  ]);

  const first = pickFirstCountry(rawCountry, q);
  const rate  = extractRatePerSec(pop);

  return {
    name: first?.name?.common || q,
    population: Number(first?.population) || 0,
    ratePerSec: rate
  };
}
