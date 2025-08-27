//src/data/datasource.js
const REST = "https://restcountries.com/v3.1/name/";
const POP  = "https://d6wn6bmjj722w.population.io/1.0/population/";

async function getJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return undefined;
    return await res.json();
  } 
  
  catch {
    return undefined;
  }
}

// Rå-kall (ingen domenelogikk)
export function fetchCountryRaw(countryName) {
  return getJSON(`${REST}${encodeURIComponent(countryName)}?fullText=true&fields=name,population`);
}

export function fetchPopTodayTomorrowRaw(countryName) {
  return getJSON(`${POP}${encodeURIComponent(countryName)}/today-and-tomorrow/`);
}
