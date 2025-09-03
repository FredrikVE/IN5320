export class CountriesRepository {

  #DAY_SECONDS = 86_400;

  constructor(datasource) {
    this.datasource = datasource;
  }

  //Metode som henter, behandler og returnerer informasjon om landets navn og folketall
  async  getCountryData(countryName) {
    const query = String(countryName).trim();
    const population = await this.datasource.fetchPopTodayTomorrowRaw(query);
    const populationArray = population?.total_population;
    
    //hvis datastrukutren har lengde mindre enn to, betyr det at landet ikke finnes.
    //antar at alle lande som finnes har et today og et tomorrow-element
    if (!Array.isArray(populationArray) || populationArray.length < 2) {
      throw new Error("COUNTRY_NOT_SUPPORTED"); // returnerer tom/feil ved ukjent land
    }

    const today = Number(populationArray[0].population);
    const tomorrow = Number(populationArray[1].population);

    return {
      name: query,
      population: today,
      growthRatePerSec: (tomorrow - today) / this.#DAY_SECONDS
    };
  }
}