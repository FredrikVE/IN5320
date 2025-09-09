/**
 * Returnerer klokketicks (0–59) med ferdig beregnet vinkel og info om størrelse.
 */
export function getClockTicks() {
  const totalTicks = 60;
  const degreesPerTick = 360 / totalTicks; // hvert tick blir 6 grader
  const startAngle = -90;     // roterer -90 grader for å starte kl 12

  const ticks = [];
  for (let i = 0; i < totalTicks; i++) {
    const angle = i * degreesPerTick + startAngle;
    const isBig = i % 5 === 0; // hver 5. tick er stor
    ticks.push({ i, angle, isBig });
  }
  return ticks;
}
