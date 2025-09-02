// Starter en ticker som oppdaterer befolkningen til alle items
export function startPopulationTicker(state, updateFunction) {
  // Hvis en timer allerede kjører, eller det ikke finnes noen items, gjør ingenting
  if (state.timer || state.items.length === 0) return;

  // Funksjon som kjører hver "tick" (dvs. hvert intervall)
  function tick() {
    // Gå gjennom alle items i state
    for (const item of state.items) {
      item.population += item.growthRatePerSec;   // øk befolkningen med vekstraten
    }
    updateFunction();
  }


  const delayinterval = 1000;                  // intervall i millisekunder (1 sekund)
  state.timer = setInterval(tick, delayinterval); // start timeren og lagre referansen i state
}

// Stopper tickeren hvis det ikke finnes flere items
export function stopTickerIfEmpty(state) {
  if (state.items.length === 0 && state.timer) {  // Sjekk at det ikke finnes items og at det finnes en aktiv timer
    clearInterval(state.timer); // stopp timeren
    state.timer = null;         // nullstill referansen
  }
}
