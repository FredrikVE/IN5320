/**
 * Returnerer klokketall (1–12) med ferdig beregnet vinkel.
 */
export function getClockNumbers() {
  const totalNumbers = 12;
  const degreesPerNumber = 360 / totalNumbers; // avstanden mellom hvert tall blir 30 grader
  const startAngle = -90;     // roterer -90 grader for å starte kl 12

  const numbers = [];
  for (let i = 0; i < totalNumbers; i++) {
    const num = i + 1;
    const angle = num * degreesPerNumber + startAngle;
    numbers.push({ num, angle });
  }
  return numbers;
}
