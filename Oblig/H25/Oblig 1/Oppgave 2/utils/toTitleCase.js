export function toTitleCase(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .split(/\s+/)                               // splitter på ett eller flere whitespace
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
