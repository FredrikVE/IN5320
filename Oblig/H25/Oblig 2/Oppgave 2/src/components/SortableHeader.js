//src/components/SortableHeader.js
export default function SortableHeader(props) {
  const { sortKey, label, activeKey, dir, onClick } = props;

  const isActive = activeKey === sortKey;
  const aria = isActive ? (dir === "ASC" ? "ascending" : "descending") : "none";
  const symbol = isActive ? (dir === "ASC" ? "▲" : "▼") : "↕";

  return (
    <th scope="col" aria-sort={aria}>
      <button
        type="button"
        className="th-btn"
        data-key={sortKey}
        onClick={onClick}
      >
        <span className="th-label">{label}</span>
        <span className="th-caret" aria-hidden="true">{symbol}</span>
      </button>
    </th>
  );
}
