import SortableHeader from "./SortableHeader";

function parseOrder(order) {
  if (!order) return { key: null, dir: null };
  var parts = order.split(":");
  return { key: parts[0], dir: parts[1] };
}

var formatPopulation = new Intl.NumberFormat();
var formatPopulationGrowth = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

export default function Table({ rows, loading, error, order, onSort }) {
  if (loading) return <p>Loading…</p>;
  if (error)   return <p style={{ color: "#c33" }}>Error: {error}</p>;
  if (!rows || rows.length === 0) return <p>No results.</p>;

  var parsed = parseOrder(order);
  var activeKey = parsed.key;
  var dir = parsed.dir;

  function handleSortClick(e) {
    var key = e.currentTarget.getAttribute("data-key");
    onSort(key);
  }

  // tekst for skjermlesere om gjeldende sort
  var sortStatus = activeKey
    ? ("Sorted by " + activeKey + " " + (dir === "ASC" ? "ascending" : "descending"))
    : "No sorting applied";

  return (
    <>
      {/* Annonser sort-endringer uten å være visuelt støy */}
      <p className="sr-only" role="status" aria-live="polite">{sortStatus}</p>

      {/* Responsiv wrapper */}
      <div className="table-wrap" role="region" aria-labelledby="country-table-caption">
        <table className="infoTable">
          <caption id="country-table-caption" className="sr-only">
            Countries, continents, population and population growth
          </caption>

          <thead>
            <tr>
              <SortableHeader sortKey="Country"
                label="Country"           
                activeKey={activeKey} 
                dir={dir} 
                onClick={handleSortClick}
              />

              <SortableHeader 
                sortKey="Continent"       
                label="Continent"         
                activeKey={activeKey} 
                dir={dir} 
                onClick={handleSortClick} 
              />

              <SortableHeader 
                sortKey="Population"       
                label="Population"        
                activeKey={activeKey} 
                dir={dir} 
                onClick={handleSortClick} 
              />

              <SortableHeader 
                sortKey="PopulationGrowth" 
                label="Population Growth" 
                activeKey={activeKey} 
                dir={dir} 
                onClick={handleSortClick}
              />
              
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
      </div>
    </>
  );
}
