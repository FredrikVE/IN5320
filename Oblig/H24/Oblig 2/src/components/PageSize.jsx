//src/components/PageSize.jsx
export function PageSize({ value, onChange }) {
  return (
    <label>
      Results per page:{" "}
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {[10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
    </label>
  );
}