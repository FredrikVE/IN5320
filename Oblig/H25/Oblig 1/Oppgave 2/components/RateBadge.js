// src/data/Ratebadge.js
export function RateBadge(rate) {
  const neg  = rate < 0;
  const span = document.createElement("span");
  span.className = `badge${neg ? " neg" : ""}`;
  span.textContent = `${neg ? "−" : "+"}${Math.abs(rate).toFixed(2)}/s`;
  return span;
}
