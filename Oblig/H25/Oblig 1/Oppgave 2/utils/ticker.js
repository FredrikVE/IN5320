export class PopulationTicker {
  constructor(itemsMap) {
    this.items = itemsMap;   // Map<string, Country>
    this.timer = null;
    this.running = false;
  }

  isRunning() {
    return this.running;
  }

  start(timerId) {
    if (this.running) return;
    this.timer = timerId;
    this.running = true;
    console.log("ticker running: ", this.running);
    console.log("timer: ", this.timer)
  }

  stop() {
    if (!this.running) return;
    clearInterval(this.timer);
    this.timer = null;
    this.running = false;
    console.log("ticker running: ", this.running);
    console.log("timer: ", this.timer)
  }

  tick() {
    for (const item of this.items.values()) {
      item.population += item.growthRatePerSec;
    }
  }
}
