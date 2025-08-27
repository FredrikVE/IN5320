// Lager <span class="badge[ neg]">±X.XX/s</span> eller returnerer null
export function RateBadge(ratePerSec) {
  if (!ratePerSec) return null
  const span = document.createElement("span")
  span.className = "badge" + (ratePerSec < 0 ? " neg" : "")
  const sign = ratePerSec < 0 ? "−" : "+"
  span.textContent = `${sign}${Math.abs(ratePerSec).toFixed(2)}/s`
  return span
}
