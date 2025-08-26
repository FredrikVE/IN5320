//src/lib/dom.js
// Kaster hvis elementet mangler → ingen "if (el)" i UI
export function must(id) {
  var el = document.getElementById(id);
  if (!el) throw new Error("Missing element #" + id);
  return el;
}
