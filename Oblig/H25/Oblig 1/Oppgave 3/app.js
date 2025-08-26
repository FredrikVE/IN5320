//src/app.js
import { initCurrency }  from "./features/currency.js";
import { initCountries } from "./features/countries.js";
import { createIdGenerator } from "./utils/generateStateID.js";

window.addEventListener("DOMContentLoaded", () => {
  const genCurrencyId = createIdGenerator("cur"); // cur-1, cur-2, ...

  initCurrency({ genId: genCurrencyId });
  initCountries(); // kan få egen genId senere hvis ønskelig
});
