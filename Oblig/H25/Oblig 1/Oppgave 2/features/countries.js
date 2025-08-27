// src/features/countries.js
import { must } from "../utils/dom.js"
import { getCountryData } from "../data/countriesRepository.js"
import { renderList } from "../components/countries/countriesView.js"
import { startTickerIfNeeded, clearTickerIfNoItems } from "../components/countries/growthTicker.js"
import { checkInput } from "../utils/checkInput.js"
import { addCountry } from "../utils/addCountry.js"

export function initCountries() {
  const form   = must("country-form")
  const input  = must("country-input")
  const search = must("country-search")
  const listEl = must("country-list")

  const state = { items: [], filter: "", timer: null }

  const render = () => renderList(listEl, state.items, state.filter)

  // legg til land
  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
      const q = checkInput(input.value, state.items) // valider input
      await addCountry(state, q, render, {
        getCountryData,
        startTicker: startTickerIfNeeded,
      }) // legg inn land
      input.value = ""
      input.focus()
    } catch (err) {
      if (err?.kind === "empty") return // ignorer tom input

      if (err?.kind === "duplicate") { // duplikat: bare clear
        input.value = ""
        render()
        return
      }

      // API-feil / ukjent land
      alert(`Ukjent land eller API-feil (${err.message}). Prøv et annet navn.`)
    }
  })

  // søk
  search.addEventListener("input", () => {
    state.filter = search.value.trim()
    render()
  })

  // slett (event delegation)
  listEl.addEventListener("click", (e) => {
    const btn = e.target instanceof Element ? e.target.closest(".delete") : null
    if (!btn) return

    const li = btn.closest("li")
    const name = li?.dataset?.name
    if (!name) return

    state.items = state.items.filter((c) => c.name !== name)
    render()
    clearTickerIfNoItems(state)
  })
}
