import { formatIntNb } from "../utils/format.js";

function RateBadge(ratePerSec) {
  if (!ratePerSec) return null; // skjul 0/null
  const span = document.createElement("span");
  span.className = "badge" + (ratePerSec < 0 ? " neg" : "");
  const sign = ratePerSec < 0 ? "−" : "+";
  span.textContent = `${sign}${Math.abs(ratePerSec).toFixed(2)}/s`;
  return span;
}

export function CountryItem({ name, population, ratePerSec }) {
  const li = document.createElement("li");
  li.className = "item";
  li.dataset.name = name;

  const title = document.createElement("p");
  title.className = "item-title";

  const strong = document.createElement("strong");
  strong.textContent = name;

  const pop = document.createElement("span");
  pop.className = "pop";
  pop.textContent = formatIntNb(population);

  title.append(strong, document.createTextNode(" — "), pop);

  const badge = RateBadge(ratePerSec);
  if (badge) title.append(" ", badge);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "delete";
  btn.setAttribute("aria-label", `Delete ${name}`);
  btn.textContent = "X";

  li.append(title, btn);
  return li;
}
