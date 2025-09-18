//src/components/PageSize.js
export default function PageSize({ value, onChange }) {
  return (
    <div className="page-size">
      <label htmlFor="page-size">Results per page:</label>
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}
