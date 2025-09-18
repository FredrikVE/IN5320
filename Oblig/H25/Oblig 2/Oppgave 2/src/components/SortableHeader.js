// src/components/SortableHeader.js
export default function SortableHeader({ columnKey, headerTitle, columnName, sortingDirection, onSort }) {

  // hvis kolonnenavn er det samme som kolonne key og sorteringsretning er DESC - så peker pil nedover. 
  // Ellers peker pilikon i header oppover.
  const directionIcon = columnName === columnKey && sortingDirection === "DESC" ? "▼" : "▲";

  return (
    <th scope="col">
      <button
        type="button"
        className="th-btn"
        data-key={columnKey}
        onClick={onSort}
      >
        <span className="th-label">{headerTitle}</span>
        <span className="th-caret">{directionIcon}</span>
      </button>
    </th>
  );
}
