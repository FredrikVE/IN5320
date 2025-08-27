// Beregninger og labelbygging holdes samlet her
import { formatPopulation } from "./numberFormat.js";

// Hvor mange sekunder har passert siden lokal midnatt for gitt dato (YYYY-MM-DD)
export function secondsSinceLocalMidnight(isoDate) {
  const midnight = new Date(`${isoDate}T00:00:00`);
  const now = new Date();
  return Math.max(0, Math.floor((now - midnight) / 1000));
}

// "Nå"-befolkning uten å akkumulere avrundingsfeil
export function currentPopulation(item, nowFn = () => Date.now()) {
  const elapsedSec = (nowFn() - item.t0) / 1000;
  const val = item.p0 + item.rate * elapsedSec;
  return Math.max(0, Math.round(val));
}

// Label som brukes i lista
export function toLabel(item, nowFn) {
  return `${item.name} - ${formatPopulation(currentPopulation(item, nowFn))}`;
}
