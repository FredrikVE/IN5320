// src/data/Ratebadge.js
// src/data/RateBadge.js
export function RateBadge(rate) {
  const span = document.createElement("span");
  let sign;
  let cls = "badge";

  if (rate < 0) {      //hvis vekstrate er mindre enn null
    sign = "−";       // setter vi minustegn som fortegn
    cls += " neg";    // legger til "neg" på HTML-klassenavn for egen CSS-styling
  } 
  
  else if (rate >= 0) { // Hvis raten er større enn eller lik null
    sign = "+";         // setter vi pluss som fortegn
  }                     // da styles CSS-en for badge grønn som standard

  span.className = cls;  //setter HTML-klassenavn til css-styling
  span.textContent = sign + Math.abs(rate).toFixed(2) + "/s";
  return span;
}
