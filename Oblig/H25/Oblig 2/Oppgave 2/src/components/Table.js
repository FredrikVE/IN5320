export default function Table({ rows, loading, error, order, onSort }) {
  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "#c33" }}>Error: {error}</p>;
  if (!rows || rows.length === 0) return <p>No results.</p>;

  var activeKey = null;
  var dir = null;
  if (order) {
    var parts = order.split(":");
    activeKey = parts[0];
    dir = parts[1];
  }

  function handleSortClick(e) {
    var key = e.currentTarget.getAttribute("data-key");
    onSort(key);
  }

  function renderHeader(key, label) {
    var isActive = activeKey === key;
    var aria = isActive ? (dir === "ASC" ? "ascending" : "descending") : "none";
    var symbol = isActive ? (dir === "ASC" ? "▲" : "▼") : "↕";

    return (
      <th scope="col" aria-sort={aria}>
        <button
          type="button"
          className="th-btn"
          data-key={key}
          onClick={handleSortClick}
        >
          <span className="th-label">{label}</span>
          <span className="th-caret" aria-hidden="true">{symbol}</span>
        </button>
      </th>
    );
  }

  // Formattere
  var formatPopulation = new Intl.NumberFormat();
  var formatPopulationGrowth = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

  return (
    <table className="infoTable">
      <thead>
        <tr>
          {renderHeader("Country", "Country")}
          {renderHeader("Continent", "Continent")}
          {renderHeader("Population", "Population")}
          {renderHeader("PopulationGrowth", "Population Growth")}
        </tr>
      </thead>
      <tbody>
        {rows.map(function (row) {
          return (
            <tr key={row.CountryCode}>
              <td>{row.Country}</td>
              <td>{row.Continent}</td>
              <td>{formatPopulation.format(Number(row.Population))}</td>
              <td>{formatPopulationGrowth.format(Number(row.PopulationGrowth))}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
