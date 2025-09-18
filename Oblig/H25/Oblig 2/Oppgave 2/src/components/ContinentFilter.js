//src/components/ContinentFilter.js
const ALL_CONTINENTS = [
  "Europe",
  "Africa",
  "South America",
  "North America",
  "Oceania",
  "Asia"
];

export default function ContinentFilter({ selected, onToggle }) {
  return (
    // område for checkbokser for kontinenter. Dette er kontinentfilter
    <fieldset className="continent-filter">
      
      {ALL_CONTINENTS.map(function (c) {
        return (
          //checkbox for å velge/avvelge et kontinent
          <label key={c} className="check">
            <input
              type="checkbox"
              checked={selected.includes(c)} // returnerer true hvis valgt kontinent finnes i selected-arrayen
              onChange={() => onToggle(c)}  // kaller toggle-funksjonen fra parent når brukeren klikker
            />
            {c}
          </label>
        );
      })}
 
    </fieldset>
  );
}
