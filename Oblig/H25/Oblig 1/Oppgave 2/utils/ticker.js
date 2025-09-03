export class PopulationTicker {
  constructor(itemsMap) {
    this.items = itemsMap;   // Map<string, Country>
    this.timer = null;       // single source of truth
  }

  start(updateInterval) {
    this.timer = updateInterval;             // oppdat
    //console.log("ticker running:", this.timer != null);
    //console.log("timer:", this.timer);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    //console.log("ticker running:", this.timer != null);
    //console.log("timer:", this.timer);
  }

  tick() {
    for (const item of this.items.values()) {
      item.population += item.growthRatePerSec;
    }
  }
}
