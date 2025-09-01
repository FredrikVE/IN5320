//src/app.js
import { currencies } from "./features/currency";
import { countries } from "./features/countries";

window.addEventListener("DOMContentLoaded", () => {
  currencies();
  countries();
});
