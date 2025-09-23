const ALL_CONTINENTS = [
  "Europe",
  "Africa",
  "South America",
  "North America",
  "Oceania",
  "Asia"
];

export function ContinentFilter({ selected, onToggle }) {
  return (
    // område for checkbokser for kontinenter. Dette er kontinentfilter
    // bruker feildset-tag for å gruppere slik at skjermlesere lettere forstår innholdet.
    <fieldset className="continent-filter">
      
      {ALL_CONTINENTS.map((continent) => { // .map() returnerer en ny liste med et JSX-element per listeelement.

        // inne i kontinentfilteret, returnerer vi en checkbox for hvert kontinent i arrayet.
        return (
          // checkbox for å velge/avvelge et kontinent
          <label key={continent} className="check">
            <input
              type="checkbox"
              checked={selected.includes(continent)} // returnerer true hvis valgt kontinent finnes i selected-arrayen
              onChange={() => onToggle(continent)}  // kaller toggle-funksjonen fra parent når brukeren klikker
            />
            {continent}
          </label>
        );
      })}
    </fieldset>
  );
}
