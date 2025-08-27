// src/components/growthTicker.js
export function startTickerIfNeeded(state, render) {
  if (state.timer || state.items.length === 0) return
  state.timer = setInterval(() => {
    for (let i = 0; i < state.items.length; i++) {
      state.items[i].population += state.items[i].ratePerSec
    }
    render()
  }, 1000)
}

export function clearTickerIfNoItems(state) {
  if (state.items.length === 0 && state.timer) {
    clearInterval(state.timer)
    state.timer = null
  }
}
