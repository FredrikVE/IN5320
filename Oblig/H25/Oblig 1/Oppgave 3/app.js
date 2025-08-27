//src/app.js
import { initCountries } from "./features/countries.js";
import { createIdGenerator } from "./utils/generateStateID.js";
import { initCurrency } from "./features/currency.js";


window.addEventListener("DOMContentLoaded", () => {
  const genCurrencyId = createIdGenerator("cur");
  const genCountryId  = createIdGenerator("country");

  initCurrency({ genId: genCurrencyId });
  initCountries({ genId: genCountryId });
});
