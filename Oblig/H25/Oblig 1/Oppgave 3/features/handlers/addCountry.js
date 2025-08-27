import { CountryRepository } from "../../data/countryRepository.js";
import { secondsSinceLocalMidnight } from "../../utils/countryCalc.js";

// Legger til nytt land, setter baseline og starter ticker ved behov
export async function handleAddCountry({
  input,
  addBtn,
  state,
  genId,
  render,
  ticker,
  repo = new CountryRepository(),
  nowFn = () => Date.now(),
  alertFn = (msg) => alert(msg),
}) {
  const raw = input.value.trim();
  if (!raw) return;

  if (addBtn) addBtn.disabled = true;
  try {
    const res = await repo.getTodayTomorrow(raw);
    if (!res.ok) {
      const msg = res.reason === "unknown-country"
        ? `Ukjent land: "${raw}". Tips: prøv landets engelske navn.`
        : `Fikk ikke data for "${raw}".`;
      alertFn(msg);
      return;
    }

    const dailyDelta = res.tomorrow.population - res.today.population;
    const rate = dailyDelta / 86400; // per sekund
    const pNow = res.today.population + rate * secondsSinceLocalMidnight(res.today.date);

    state.items.push({
      id: genId(),
      name: res.country,
      p0: pNow,       // baseline ved t0
      t0: nowFn(),    // starttidspunkt for ticking
      rate,           // personer per sekund
      date: res.today.date,
    });

    input.value = "";
    input.focus();
    render();
    ticker?.ensure();
  } catch (err) {
    console.error("Population lookup error:", err);
    alertFn("Noe gikk galt ved henting av befolkningsdata. Prøv igjen.");
  } finally {
    if (addBtn) addBtn.disabled = false;
  }
}
