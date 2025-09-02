//src/components/CountryItem.js
import { formatPopulationNumber } from "../utils/populationNumberFormat.js";
import { RateBadge } from "./rateBadge.js";

export function CountryItem({ name, population, growthRatePerSec }) {

  // Oppretter <li>-element og tildeler styling klasse som brukes i list.css
  const li = document.createElement("li");
  li.className = "item";
  li.dataset.name = name;

  // Oppretter et <p>-element som skal inneholde navnet på landet i lista
  const title = document.createElement("p");
  title.className = "item-title";

  // Oppretter <strong>-tag for å gi landets nav fet skrift
  const strong = document.createElement("strong");
  strong.textContent = name;

  // oppretter <span>-tag for å kunne hente og style befolkningstallet
  const pop = document.createElement("span");
  pop.className = "pop";                        //denne brukes ikke, men er der hvis man vil style befolkningtall i list.css
  pop.textContent = formatPopulationNumber(population);

  // Lager en tittle med uthevet skrift som viser både navn på land og befolkningstall
  title.append(strong, document.createTextNode(" — "), pop);

  // oppretter et lite "badge" som viser hva som er vekstraten til et land
  const badge = RateBadge(growthRatePerSec);
  title.append(badge)

  // oppretter et button-element for å slette elementer i lista
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "delete";
  btn.setAttribute("title", `Delete ${name}`);
  btn.textContent = "X";    //Markerer knappen med stor X for å indikere at dette er slette-knapp

  // Legger til tittel med informasjon om land, befolkningstall, vekstrate og slettknapp i listeelementet
  li.append(title, btn);
  return li;                // Returnerer det ferdigbygde <li>-elementet.
}
