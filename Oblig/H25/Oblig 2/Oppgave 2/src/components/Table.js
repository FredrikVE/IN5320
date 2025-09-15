//src/components/Table.js
import SortableHeader from "./SortableHeader";

var formatPopulation = new Intl.NumberFormat();
var formatPopulationGrowth = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

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

  // Les direkte fra order-objektet
  const { key: activeKey, dir } = order;

  function handleSortClick(e) {
    const key = e.currentTarget.getAttribute("data-key");
    onSort(key);
  }

  return (
    <div id="results" className="table-wrap" role="region" aria-label="Search results">
      <table className="infoTable">
        <thead>
          <tr>
            <SortableHeader 
              sortKey="Country"           
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
          {rows.map((row) => (
            <tr key={row.CountryCode}>
              <td>{row.Country}</td>
              <td>{row.Continent}</td>
              <td>{formatPopulation.format(Number(row.Population))}</td>
              <td>{formatPopulationGrowth.format(Number(row.PopulationGrowth))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
