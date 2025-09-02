/**
 * Formatterer et befolkningstall for visning (norsk locale).
 * - Runder til heltall
 * - Bruker tusenskilletegn iht. "nb-NO"
 */
export function formatPopulationNumber(n) {
  const value = Math.round(Number(n));
  return value.toLocaleString("nb-NO");
}