/**
 * Gir CSS transform for en tick.
 */
export function getClockTickTransform(angle, radiusVar) {
  return `translate(-50%, -50%) rotate(${angle}deg) translate(var(${radiusVar}))`;
}
