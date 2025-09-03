export class PopulationTicker {
  constructor(itemsMap) {
    this.items = itemsMap;   // Map<string, Country>
    this.timer = null;       // Holder på timerIntervall med ID. Hvis null, kjører ikke timer
    this.tickInterval = 1000; // Oppdatering per sekund. 1000 ms = 1s
  }

  // Metode som starter tikkingen 
  // den tar inn updateCountryList funksjon for å rendre innholdet til UI-en
  start(updateCountryList) {
    this.tick(updateCountryList);
  }

  // Metode som stopper timer og rydder intervallet og resetter timeren
  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  // Metode som oppretter selve tidsintervallet og intervall-IDen
  tick(updateCountryList) {
    this.timer = setInterval(() => {
      this.advance();            // Oppdaterer folketall med vekstrate per sekund.
      updateCountryList();      // Oppdaterer listen slik at innholdet vises i lista
    }, this.tickInterval);      // setter tidsintervallet til 1000 ms = 1s
  }

  // Metode som oppdaterer vekstrate hver gang den blir påkalt
  advance() {
    for (const item of this.items.values()) {
      item.population += item.growthRatePerSec; // Øker populasjon for hvert land med vekstrate per sekund
    }
  }
}
