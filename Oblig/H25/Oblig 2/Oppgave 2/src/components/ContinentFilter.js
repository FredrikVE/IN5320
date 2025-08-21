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
    <fieldset className="continent-filter">
      <div className="checks">
        {ALL_CONTINENTS.map(function (c) {
          return (
            <label key={c} className="check">
              <input
                type="checkbox"
                checked={selected.includes(c)}
                onChange={function(){ onToggle(c); }}
              />
              {c}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
