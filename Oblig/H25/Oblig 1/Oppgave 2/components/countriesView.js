// src/components/countriesView.js
import { startsWithWord } from "../lib/search.js"

const fmt = (n) => Math.round(n).toLocaleString("nb-NO")

export function renderList(listEl, items, filter) {
  const filtered = items.filter((x) => startsWithWord(x.name, filter))

  const html = filtered
    .map((item) => {
      const sign = item.ratePerSec < 0 ? "−" : "+"
      const badge = item.ratePerSec
        ? `<span class="badge ${item.ratePerSec < 0 ? "neg" : ""}">
             ${sign}${Math.abs(item.ratePerSec).toFixed(2)}/s
           </span>`
        : ""

      return `
        <li class="item" data-name="${escapeAttr(item.name)}">
          <p class="item-title">
            <strong>${escapeHtml(item.name)}</strong> — 
            <span class="pop">${fmt(item.population)}</span> ${badge}
          </p>
          <button class="delete" type="button" aria-label="Delete ${escapeAttr(item.name)}">X</button>
        </li>
      `
    })
    .join("")

  listEl.innerHTML = html
}

// Enkle escapes for sikkerhets skyld (unngå HTML i navn)
function escapeHtml(s = "") {
  return String(s).replace(/[&<>"']/g, (m) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]
  ))
}
function escapeAttr(s = "") { return escapeHtml(s) }
