// src/utils/ticker.js
export function startPopulationTicker(state, render) {           // Eksporterer funksjon som starter tikkeren som oppdaterer populasjon + rerender
  if (state.timer || state.items.length === 0) return;           // Avbryt hvis tikkeren allerede går, eller hvis lista er tom

  function tick() {                                              // En enkelt "tick" – kjøres periodisk av setInterval
    let changed = false;                                         // Flag: ble noe synlig (avrundet) faktisk endret?
    for (var i = 0; i < state.items.length; i++) {               // Gå gjennom alle land i state
      var item = state.items[i];                                 // Hent nåværende land
      const prev = Math.round(item.population);                  // Husk forrige visningsverdi (avrundet heltall)
      
      item.population += item.growthRatePerSec;                  // Øk populasjonen basert på vekst per sekund
      if (Math.round(item.population) !== prev) {                // Sjekk om den avrundede verdien har endret seg
        changed = true;                                          // Hvis ja, marker at vi må rerendre
      }
    }
    if (changed) {                                               // Bare hvis noe synlig ble endret…
      render();                                                  // …oppdater DOM (unngå unødvendige renders)
    }
  }

  const delayinterval = 1000;                                    // Antall millisekunder mellom ticks (1 sekund)
  state.timer = setInterval(tick, delayinterval);                // Start intervall, lagre id på state for å kunne stoppe senere
}

export function stopTickerIfEmpty(state) {                       // Eksporterer funksjon som stopper tikkeren hvis lista er tom
  if (state.items.length === 0 && state.timer) {                 // Hvis ingen elementer igjen og timer finnes…
    clearInterval(state.timer);                                  // …stopp intervall
    state.timer = null;                                          // Nullstill referanse slik at start kan kjøres igjen senere
  }
}
