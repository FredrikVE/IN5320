// src/components/Table.js
import SortableHeader from "./SortableHeader";

const formatPopulation = new Intl.NumberFormat();
const formatPopulationGrowth = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
});

export default function Table({ rows, loading, error, order, onSort }) {
  if (loading) {
    return (
      <div className="table-wrap" aria-live="polite">
        <p className="table-status">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-wrap" aria-live="assertive">
        <p className="table-error" role="alert">Error: {error}</p>
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="table-wrap" aria-live="polite">
        <p className="table-empty">No results.</p>
      </div>
    );
  }

  function handleSortClick(e) {
    const key = e.currentTarget.getAttribute("data-key");
    onSort(key);
  }

  return (
    <div
      id="results"
      className="table-wrap"
      role="region"
      aria-label="Search results"
    >
      <table className="infoTable">
        <thead>
          <tr>
            <SortableHeader
              columnKey="Country"
              headerTitle="Country"
              columnName={order.columnName}
              sortingDirection={order.sortingDirection}
              onSort={handleSortClick}
            />
            <SortableHeader
              columnKey="Continent"
              headerTitle="Continent"
              columnName={order.columnName}
              sortingDirection={order.sortingDirection}
              onSort={handleSortClick}
            />
            <SortableHeader
              columnKey="Population"
              headerTitle="Population"
              columnName={order.columnName}
              sortingDirection={order.sortingDirection}
              onSort={handleSortClick}
            />
            <SortableHeader
              columnKey="PopulationGrowth"
              headerTitle="Population Growth"
              columnName={order.columnName}
              sortingDirection={order.sortingDirection}
              onSort={handleSortClick}
            />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.CountryCode}>
              <td>{row.Country}</td>
              <td>{row.Continent}</td>
              <td>{formatPopulation.format(Number(row.Population))}</td>
              <td>
                {formatPopulationGrowth.format(Number(row.PopulationGrowth))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
