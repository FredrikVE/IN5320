// src/components/countriesView.js
import { startsWithWord } from "../utils/search.js"

const nf = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 })
const fmt = (n) => nf.format(Math.round(Number.isFinite(n) ? n : 0))

function createBadge(ratePerSec) {
  if (!ratePerSec) return null
  const span = document.createElement("span")
  span.className = "badge" + (ratePerSec < 0 ? " neg" : "")
  const sign = ratePerSec < 0 ? "−" : "+"
  span.textContent = `${sign}${Math.abs(ratePerSec).toFixed(2)}/s`
  return span
}

function createItemNode(item) {
  const li = document.createElement("li")
  li.className = "item"
  li.dataset.name = item.name // kompatibelt med delete-handleren din

  const p = document.createElement("p")
  p.className = "item-title"

  const strong = document.createElement("strong")
  strong.textContent = item.name

  const sep = document.createTextNode(" — ")

  const pop = document.createElement("span")
  pop.className = "pop"
  pop.textContent = fmt(item.population)

  p.appendChild(strong)
  p.appendChild(sep)
  p.appendChild(pop)

  const badge = createBadge(item.ratePerSec)
  if (badge) {
    p.appendChild(document.createTextNode(" "))
    p.appendChild(badge)
  }

  const btn = document.createElement("button")
  btn.className = "delete"
  btn.type = "button"
  btn.setAttribute("aria-label", `Delete ${item.name}`)
  btn.textContent = "X"

  li.appendChild(p)
  li.appendChild(btn)
  return li
}

export function renderList(listEl, items, filter) {
  const src = Array.isArray(items) ? items : []
  const filtered = filter ? src.filter(x => startsWithWord(x.name, filter)) : src

  const frag = document.createDocumentFragment()
  for (const item of filtered) {
    frag.appendChild(createItemNode(item))
  }

  // bytt hele innholdet atomisk
  listEl.innerHTML = ""
  listEl.appendChild(frag)
}
