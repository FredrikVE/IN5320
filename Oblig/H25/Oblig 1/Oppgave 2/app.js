import { initCurrency }  from "./features/currency.js";
import { initCountries } from "./features/countries.js";

window.addEventListener("DOMContentLoaded", () => {
  initCurrency();
  initCountries();
});
