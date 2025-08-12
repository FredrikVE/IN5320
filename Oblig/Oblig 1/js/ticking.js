import { updatePopulationSpans } from "./render.js";

export function startTicking(state, els, filterFn) {
  stopTicking(state);
  state.tickTimerId = setInterval(() => {
    let changed = false;
    state.items.forEach((it) => {
      if (typeof it.population === "number" && typeof it.ratePerSec === "number") {
        it.population += it.ratePerSec;
        changed = true;
      }
    });
    if (changed) updatePopulationSpans(els, state, filterFn);
  }, 1000);
}

export function stopTicking(state) {
  if (state.tickTimerId != null) {
    clearInterval(state.tickTimerId);
    state.tickTimerId = null;
  }
}
