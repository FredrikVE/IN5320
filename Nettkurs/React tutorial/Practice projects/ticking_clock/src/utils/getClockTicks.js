/**
 * Returnerer klokketicks (0–59) med ferdig beregnet vinkel og info om størrelse.
 */
export function getClockTicks() {
  return Array.from({ length: 60 }, (_, i) => {
    const angle = i * 6 - 90; // start kl 12
    const isBig = i % 5 === 0;
    return { i, angle, isBig };
  });
}
