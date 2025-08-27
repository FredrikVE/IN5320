// src/data/countriesRepository.js
import { fetchCountryRaw, fetchPopTodayTomorrowRaw } from "./countriesDatasource.js"

const DAY_SECONDS = 86400

export async function getCountryData(countryName) {
  const q = String(countryName ?? "").trim()
  if (!q) throw new Error("EMPTY_QUERY")

  const [countries, pop] = await Promise.all([
    fetchCountryRaw(q),
    fetchPopTodayTomorrowRaw(q),
  ])

  const country = countries?.[0]
  if (!country) throw new Error("COUNTRY_NOT_FOUND")

  const arr = pop?.total_population ?? []
  if (arr.length < 2) throw new Error("POP_DATA_MISSING")

  const today    = Number(arr[0].population) || 0
  const tomorrow = Number(arr[1].population) || 0
  const ratePerSec = (tomorrow - today) / DAY_SECONDS

  return {
    name:       country?.name?.common ?? q,
    population: Number(country?.population) || 0,
    ratePerSec,
  }
}
