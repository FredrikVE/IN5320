import { initCurrency }  from "./features/currency.js";
import { initCountries } from "./features/countries.js";

window.addEventListener("DOMContentLoaded", () => {
  initCurrency();   // Step 1–4
  initCountries();  // Step 5–6
});
