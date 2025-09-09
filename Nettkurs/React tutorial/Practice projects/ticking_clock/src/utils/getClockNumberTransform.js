/**
 * Gir CSS transform for et tall på klokka.
 */
export function getClockNumberTransform(angle, radiusVar) {
  return `translate(-50%, -50%) rotate(${angle}deg) translate(var(${radiusVar})) rotate(${-angle}deg)`;
}
