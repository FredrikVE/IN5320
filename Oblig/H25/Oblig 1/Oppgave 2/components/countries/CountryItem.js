import { RateBadge } from "./RateBadge.js"

const fmt = (n) => Math.round(Number(n) || 0).toLocaleString("nb-NO")

// Lager ett <li> med tittel, populasjon, (ev.) badge og delete-knapp
export function CountryItem({ name, population, ratePerSec }) {
  const li = document.createElement("li")
  li.className = "item"
  li.dataset.name = name

  const title = document.createElement("p")
  title.className = "item-title"

  const strong = document.createElement("strong")
  strong.textContent = name

  const pop = document.createElement("span")
  pop.className = "pop"
  pop.textContent = fmt(population)

  title.append(strong, document.createTextNode(" — "), pop)

  const badge = RateBadge(ratePerSec)
  if (badge) title.append(" ", badge)

  const btn = document.createElement("button")
  btn.className = "delete"
  btn.type = "button"
  btn.setAttribute("aria-label", `Delete ${name}`)
  btn.textContent = "X"

  li.append(title, btn)
  return li
}
