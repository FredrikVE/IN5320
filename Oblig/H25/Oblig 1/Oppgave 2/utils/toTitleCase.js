//src/utils/toTitleCase.js
export function toTitleCase(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .split(/\s+/)                               // splitt på ett eller flere whitespace
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
