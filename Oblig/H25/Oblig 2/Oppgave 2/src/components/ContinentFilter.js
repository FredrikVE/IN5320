import React from "react";

const ALL_CONTINENTS = [
  "Europe",
  "Africa",
  "South America",
  "North America",
  "Oceania",
  "Asia",
];

function ContinentFilter({ selected, onToggle }) {
  return (
    <div style={{ textAlign: "center", margin: "6px 0" }}>
      {ALL_CONTINENTS.map((c) => (
        <label key={c} style={{ marginRight: 8 }}>
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

export default ContinentFilter;
