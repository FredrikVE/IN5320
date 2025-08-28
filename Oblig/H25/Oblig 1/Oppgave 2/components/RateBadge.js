export function RateBadge(rate) {
  //if (!rate) return null;                    // skjul 0/null
  const neg  = rate < 0;
  const span = document.createElement("span");
  span.className = `badge${neg ? " neg" : ""}`;
  span.textContent = `${neg ? "−" : "+"}${Math.abs(rate).toFixed(2)}/s`;
  return span;
}
