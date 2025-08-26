import { PopulationDataSource } from "../datasources/populationDataSource.js";

export class CountryRepository {
  constructor(ds = new PopulationDataSource()) {
    this.ds = ds;
    this._countries = null;       // cache av støttede land (normalisert + original)
    this._countryMap = null;      // map: lower -> original
  }

  async ensureCountries() {
    if (this._countries) return;
    const list = await this.ds.getCountries();
    // lag et map som matcher case-insensitivt og gir tilbake original skrivemåte
    this._countries = list;
    this._countryMap = new Map(
      list.map(name => [name.toLowerCase(), name])
    );
  }

  async resolveCountryName(input) {
    await this.ensureCountries();
    const key = String(input ?? "").trim().toLowerCase();
    return this._countryMap.get(key) ?? null;
  }

  async getPopulationToday(countryInput) {
    // 1) valider/normaliser
    const normalized = await this.resolveCountryName(countryInput);
    if (!normalized) return { ok: false, reason: "unknown-country" };

    // 2) hent rådata og plukk ut dagens tall
    const raw = await this.ds.getTodayAndTomorrow(normalized);
    const arr = raw?.total_population;
    const today = Array.isArray(arr) && arr.length > 0 ? arr[0] : null;
    if (!today?.population && today?.population !== 0) {
      // API returnerte tomt eller uventet
      return { ok: false, reason: "no-data", country: normalized };
    }

    return {
      ok: true,
      country: normalized,
      population: Number(today.population),
      date: today.date,
    };
  }

  async listCountries() {
    await this.ensureCountries();
    return this._countries.slice();
  }
}
