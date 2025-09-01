//src/app.js
import { currencies } from "./features/currency.js";
import { countries } from "./features/countries.js";

window.addEventListener("DOMContentLoaded", () => {
  currencies();
  countries();
});
