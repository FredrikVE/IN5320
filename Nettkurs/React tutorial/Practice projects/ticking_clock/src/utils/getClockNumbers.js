/**
 * Returnerer klokketall (1–12) med ferdig beregnet vinkel.
 */
export function getClockNumbers() {
  return Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const angle = num * 30 - 90; // 12 oppe
    return { num, angle };
  });
}
