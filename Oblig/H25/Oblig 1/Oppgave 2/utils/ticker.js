export function startPopulationTicker(state, render) {
  if (state.timer || state.items.length === 0) return;

  function tick() {
    let changed = false;

    for (const item of state.items) {
      const prev = Math.round(item.population);
      item.population += item.growthRatePerSec;
      
      if (Math.round(item.population) !== prev) {
        changed = true;
      }
    }

    if (changed) {
      render();
    }
  }

  const delayinterval = 1000;
  state.timer = setInterval(tick, delayinterval);
}

export function stopTickerIfEmpty(state) {
  if (state.items.length === 0 && state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}
