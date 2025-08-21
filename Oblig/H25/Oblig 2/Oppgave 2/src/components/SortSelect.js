export default function SortSelect({ value, onChange }) {
  return (
    <div className="sort-select">
      <label htmlFor="sort-order">Sort:</label>
      <select id="sort-order" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">(none)</option>
        <option value="Country:ASC">Country ↑</option>
        <option value="Country:DESC">Country ↓</option>
        <option value="Population:ASC">Population ↑</option>
        <option value="Population:DESC">Population ↓</option>
        <option value="PopulationGrowth:ASC">Growth ↑</option>
        <option value="PopulationGrowth:DESC">Growth ↓</option>
      </select>
    </div>
  );
}
