// src/data/countriesRepository.js
import { fetchPopTodayTomorrowRaw } from "./countriesDatasource.js"

const DAY_SECONDS = 86400

export async function getCountryData(countryName) {
  const query = String(countryName ?? "").trim()
  if (!query) throw new Error("EMPTY_QUERY")

  const pop = await fetchPopTodayTomorrowRaw(query)
  const arr = pop?.total_population
  if (!Array.isArray(arr) || arr.length < 2) {
    // population.io returnerer tom/feil ved ukjent land
    throw new Error("COUNTRY_NOT_SUPPORTED")
  }

  const today = Number(arr[0]?.population) || 0
  const tomorrow = Number(arr[1]?.population) || 0
  const growthRatePerSec = (tomorrow - today) / DAY_SECONDS

  return {
    name: query,
    population: today,
    growthRatePerSec: growthRatePerSec,
  }
}
