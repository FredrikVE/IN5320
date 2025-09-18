// src/components/Table.js
import SortableHeader from "./SortableHeader";

const formatPopulation = new Intl.NumberFormat();
const formatPopulationGrowth = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
});

export default function Table({ rows, loading, error, order, onSort }) {

  // Loadingmelding
  if (loading) {
    return (
      <div className="table-wrap">
        <p className="table-status">Loading…</p>
      </div>
    );
  }

  // Potensiell error-melding
  if (error) {
    return (
      <div className="table-wrap">
        <p className="table-error" role="alert">Error: {error}</p>
      </div>
    );
  }

  // Hvis tabellen er tom viser beskjed om "No results..."
  if (!rows || rows.length === 0) {
    return (
      <div className="table-wrap">
        <p className="table-empty">No results...</p>
      </div>
    );
  }


  // Handlefunksjon for klikk i sorteringsheaderknapp
  const handleSortClick = (e) => {
    const key = e.currentTarget.getAttribute("data-key");
    onSort(key);
  }

  // Returnerer tabellstruktur
  return (
    <div className="table-wrap">
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
