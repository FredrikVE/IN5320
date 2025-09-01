// src/data/datasource.js
const BASE_URL = "https://d6wn6bmjj722w.population.io/1.0/"

/** Hent JSON, returner null ved feil */
async function getJSON(path) {
  try {
    const res = await fetch(BASE_URL + path)
    if (!res.ok) return null
    return await res.json()
  } 
  
  catch {
    return null
  }
}

/** hent dagens og morgendagens populasjon for et land */
export function fetchPopTodayTomorrowRaw(countryName) {
  const name = encodeURIComponent(countryName)
  return getJSON(`population/${name}/today-and-tomorrow/?format=json`)
}
