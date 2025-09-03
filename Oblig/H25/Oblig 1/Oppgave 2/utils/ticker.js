export class PopulationTicker {
  constructor(itemsMap) {
    this.items = itemsMap;   // Map<string, Country>
    this.timer = null;       // single source of truth
    this.tickInterval = 1000; // Oppdatering per sekund. 1000 ms = 1s
  }

  start(updateCountryList) {
    this.tick(updateCountryList);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  tick(updateCountryList) {
    this.timer = setInterval(() => {
      this.advance();
      updateCountryList();
    }, this.tickInterval);
  }

  advance() {
    for (const item of this.items.values()) {
      item.population += item.growthRatePerSec;
    }
  }
}
