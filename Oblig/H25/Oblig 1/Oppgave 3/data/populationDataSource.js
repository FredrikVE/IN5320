const DEFAULT_BASE = "https://d6wn6bmjj722w.population.io/1.0";

export class PopulationDataSource {
  constructor(baseUrl = DEFAULT_BASE) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  async getCountries() {
    const url = `${this.baseUrl}/countries/`;
    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`countries fetch failed: ${res.status}`);
    const json = await res.json();
    // Forventet: { countries: [...] }
    return Array.isArray(json?.countries) ? json.countries : [];
  }

  async getTodayAndTomorrow(countryName) {
    // Rådata – repository tar ut relevant felt
    const name = encodeURIComponent(countryName);
    const url = `${this.baseUrl}/population/${name}/today-and-tomorrow/`;
    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (!res.ok) {
      if (res.status === 404) return null; // API kan indikere ukjent land
      throw new Error(`population fetch failed: ${res.status}`);
    }
    return await res.json();
  }
}
