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
    <div>
      {ALL_CONTINENTS.map((c) => (
        <label key={c}>
          <input
            type="checkbox"
            checked={selected.includes(c)}
            onChange={() => onToggle(c)}
          />
          {c}
        </label>
      ))}
    </div>
  );
}
