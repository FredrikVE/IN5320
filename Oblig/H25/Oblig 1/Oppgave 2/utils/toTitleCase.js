export function toTitleCase(input) {
  return String(input)
    .toLowerCase()                           // gjør hele strengen om til små bokstaver
    .trim()                                  // fjerner mellomrom i starten og slutten
    .split(" ")                              // deler opp strengen i ord basert på mellomrom
    .filter(Boolean)                         // fjerner tomme elementer (fra flere mellomrom på rad)
    .map(w => w[0].toUpperCase() + w.slice(1)) // gjør første bokstav i hvert ord stor
    .join(" ");                              // setter sammen ordene igjen med ett mellomrom mellom
}
