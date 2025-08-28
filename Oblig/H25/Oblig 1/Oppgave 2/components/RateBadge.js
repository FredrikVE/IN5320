export function RateBadge(growthRatePerSec) {
  if (!growthRatePerSec) return null; // skjul 0/null
  const span = document.createElement("span");
  span.className = "badge" + (growthRatePerSec < 0 ? " neg" : "");
  const sign = growthRatePerSec < 0 ? "−" : "+";
  span.textContent = `${sign}${Math.abs(growthRatePerSec).toFixed(2)}/s`;
  return span;
}
