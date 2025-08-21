export default function SortableHeader(props) {
  var sortKey = props.sortKey;
  var label = props.label;
  var activeKey = props.activeKey;
  var dir = props.dir;
  var onClick = props.onClick;

  var isActive = activeKey === sortKey;
  var aria = isActive ? (dir === "ASC" ? "ascending" : "descending") : "none";
  var symbol = isActive ? (dir === "ASC" ? "▲" : "▼") : "↕";

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
