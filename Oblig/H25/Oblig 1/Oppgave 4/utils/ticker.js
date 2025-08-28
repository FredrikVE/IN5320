// src/utils/ticker.js
export function ensureTicker(state, render, intervalMs = 1000) {
  if (state.timer || state.items.length === 0) return;
  state.timer = setInterval(() => {
    for (const it of state.items) {
      it.population += it.growthRatePerSec || 0;
    }
    render();
  }, intervalMs);
}

export function stopTickerIfEmpty(state) {
  if (state.items.length === 0 && state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}
