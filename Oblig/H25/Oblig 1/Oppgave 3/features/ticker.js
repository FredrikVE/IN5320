// En enkel ticker som rerendrer hvert sekund når det finnes items
export function createListTicker(state, render, intervalMs = 1000) {
  let timer = null;

  function ensure() {
    if (timer) return;
    timer = setInterval(() => {
      if (state.items.length === 0) {
        stop();
        return;
      }
      render();
    }, intervalMs);
  }

  function stopIfEmpty() {
    if (state.items.length === 0) stop();
  }

  function stop() {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
  }

  return {
    ensure,
    stopIfEmpty,
    stop,
    isRunning: () => !!timer,
  };
}
