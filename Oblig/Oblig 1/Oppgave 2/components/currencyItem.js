export function CurrencyItem(name) {

   // Oppretter <li>-element og tildeler styling klasse som brukes i list.css
  const li = document.createElement("li");
  li.className = "item";
  li.dataset.name = name;

  // Oppretter et <p>-element som skal inneholde navnet på valutaen
  const title = document.createElement("p");
  title.className = "item-title";
  title.textContent = name;

  // oppretter et button-element for å slette elementer i lista
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "delete"; //gir klassenavn for .css-styling i buttons.css
  btn.setAttribute("title" ,`Delete ${name}`);
  btn.textContent = "X"; //Markerer knappen med stor X for å indikere at dette er slette-knapp

  // Legger til tittel valutanavn og knapp for sletting
  li.append(title, btn);
  return li;
}
