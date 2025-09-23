export function formatPopulationNumber(inputNumber) {
  const value = Math.round(Number(inputNumber)); // Runder til heltall
  return value.toLocaleString("nb-NO"); //Returnerer opprundet heltall med tusenskilletegn
}