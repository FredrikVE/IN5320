// Kaster hardt hvis element mangler — fjerner behov for "if (el)" rundt omkring
export function must(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error("Missing element #" + id);
  return el;
}
