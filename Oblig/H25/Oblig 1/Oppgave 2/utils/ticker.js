// src/utils/ticker.js
export function startPopulationTicker(state, render) {
  if (state.timer || state.items.length === 0) return;

  function tick() {
    for (var i = 0; i < state.items.length; i++) {
      var item = state.items[i];
      item.population += item.growthRatePerSec; // ingen || 0
    }
    render();
  }

  const delay = 1000; 
  state.timer = setInterval(tick, delay);
}

export function stopTickerIfEmpty(state) {
  if (state.items.length === 0 && state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}
