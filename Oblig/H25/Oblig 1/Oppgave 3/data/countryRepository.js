// src/data/countryRepository.js
import { PopulationDataSource } from "./populationDataSource.js";

export class CountryRepository {
  constructor(ds = new PopulationDataSource()) {
    this.ds = ds;
    this._countries = null;  // cache av støttede land
    this._countryMap = null; // map: lowercased navn -> original skrivemåte
  }

  async ensureCountries() {
    if (this._countries) return;
    const list = await this.ds.getCountries();
    this._countries = Array.isArray(list) ? list : [];
    this._countryMap = new Map(
      this._countries.map(name => [String(name).toLowerCase(), name])
    );
  }

  async resolveCountryName(input) {
    await this.ensureCountries();
    const key = String(input ?? "").trim().toLowerCase();
    return this._countryMap.get(key) ?? null;
  }

  /**
   * Del 5: henter dagens befolkningstall for et land.
   */
  async getPopulationToday(countryInput) {
    const normalized = await this.resolveCountryName(countryInput);
    
    if (!normalized) {
      return { ok: false, reason: "unknown-country" };
    }

    const raw = await this.ds.getTodayAndTomorrow(normalized);
    const arr = raw?.total_population;
    const today = Array.isArray(arr) && arr.length > 0 ? arr[0] : null;

    if (!today || today.population === undefined || today.population === null) {
      return { ok: false, reason: "no-data", country: normalized };
    }

    return {
      ok: true,
      country: normalized,
      population: Number(today.population),
      date: today.date,
    };
  }

  /**
   * Del 6: henter både dagens og morgendagens tall (brukes til å beregne rate/sekund).
   */
  async getTodayTomorrow(countryInput) {
    const normalized = await this.resolveCountryName(countryInput);
    if (!normalized) return { ok: false, reason: "unknown-country" };

    const raw = await this.ds.getTodayAndTomorrow(normalized);
    const arr = raw?.total_population;
    const [today, tomorrow] = Array.isArray(arr) ? arr : [];

    const hasNum = x => x && x.population !== undefined && x.population !== null;
    if (!hasNum(today) || !hasNum(tomorrow)) {
      return { ok: false, reason: "no-data", country: normalized };
    }

    return {
      ok: true,
      country: normalized,
      today:    { date: today.date,    population: Number(today.population) },
      tomorrow: { date: tomorrow.date, population: Number(tomorrow.population) },
    };
  }

  async listCountries() {
    await this.ensureCountries();
    return this._countries.slice();
  }
}
