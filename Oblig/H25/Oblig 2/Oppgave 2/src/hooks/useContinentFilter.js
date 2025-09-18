import { useState } from "react";    // importerer useState-hooken fra React

export function useContinentFilter() {

  // state-variabel 'continents' intansieres som tom array
  const [continents, setContinents] = useState([]);

  // arrow-funksjon for å slå et kontinent av/på i listen
  const toggleContinent = (name) => {
    setContinents((prev) => {           // oppdaterer state basert på forrige verdi
      const list = [...prev];           // bruker spread operator til å lage nye kopi av den gamle arrayen slik at vi ikke å mutere direkte
      const i = list.indexOf(name);     // finner index til kontinentet dersom det finnes i arrayen

      if (i === -1) {                   // hvis kontinentet IKKE finnes i listen
        list.push(name);                // legg det til på slutten av arrayen
      } 
      
      else {                            // hvis kontinentet finnes i listen
        list.splice(i, 1);              // fjern kontinentet fra arrayen med splice på indekspossisjon i. Antall elementer som slettes er 1.
      }
      
      return list;                      // returner den oppdaterte listen etter toggle slik at React oppdaterer state
    });
  }

  return [ continents, toggleContinent ]; //rerunrerer en tuple med hookens stateverdi og updatefunksjon
}
