//src/components/ContinentFilters.jsx
export function ContinentFilters({ selected, onToggle }) {
  const items = ["Europe", "Africa", "South America", "North America", "Oceania", "Asia"];
  return (
    <div className="row gap small">
      {items.map(c => (
        <label key={c}>
          <input type="checkbox" checked={selected.includes(c)} onChange={() => onToggle(c)} />
          {c}
        </label>
      ))}
    </div>
  );
}