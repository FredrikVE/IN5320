import { Countries } from "./features/countries.js";
import { Currencies } from "./features/currency.js";
import { CountriesDatasource } from "./data/countriesDatasource.js";
import { CountriesRepository } from "./data/countriesRepository.js";

window.addEventListener("DOMContentLoaded", () => {

  // Instansierer datasource og repository for API-kall
  const countriesDatasource = new CountriesDatasource()
  const countriesRepository = new CountriesRepository(countriesDatasource);

  // Instansieres features for Currencies og Countries
  new Currencies();
  new Countries(countriesRepository);
});
