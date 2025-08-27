//src/utils/addCountry.js
export async function addCountry(state, q, render, { getCountryData, startTicker }) {
  const result = await getCountryData(q)
  state.items.push(result)
  render()
  startTicker(state, render)
}
