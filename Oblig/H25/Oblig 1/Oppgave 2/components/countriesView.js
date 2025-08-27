// src/components/countriesView.js
import { startsWithWord } from "../utils/search.js"
import { CountryItem } from "./CountryItem.js"

export function renderList(listEl, items = [], filter = "") {
  const filtered = filter ? items.filter(x => startsWithWord(x.name, filter)) : items

  const frag = document.createDocumentFragment()
  for (const item of filtered) {
    frag.appendChild(CountryItem(item))
  }

  listEl.replaceChildren(frag)
}

