//src/components/CountryItem.js
import { formatPopulationNumber } from "../utils/populationNumberFormat.js";
import { RateBadge } from "./RateBadge.js";

export function CountryItem({ name, population, growthRatePerSec: growthRatePerSec }) {
  const li = document.createElement("li");
  li.className = "item";
  li.dataset.name = name;

  const title = document.createElement("p");
  title.className = "item-title";

  const strong = document.createElement("strong");
  strong.textContent = name;

  const pop = document.createElement("span");
  pop.className = "pop";
  pop.textContent = formatPopulationNumber(population);

  title.append(strong, document.createTextNode(" — "), pop);

  const badge = RateBadge(growthRatePerSec);
  if (badge) title.append(" ", badge);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "delete";
  btn.setAttribute("aria-label", `Delete ${name}`);
  btn.textContent = "X";

  li.append(title, btn);
  return li;
}
