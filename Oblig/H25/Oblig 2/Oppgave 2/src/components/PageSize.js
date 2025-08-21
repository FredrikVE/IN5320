export default function PageSize({ value, onChange }) {
  return (
    <label className="page-size">
      Results per page:{" "}
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))} // gi tallet videre
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </label>
  );
}
