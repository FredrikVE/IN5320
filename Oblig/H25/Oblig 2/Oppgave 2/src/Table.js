// src/Table.js


/*
function Table(props) {
  const { apiData, loading, error, sortOrder, onSort } = props; //alertnativ måte å ta ting inn i parameter
*/

function Table({ apiData, loading, error, sortOrder, onSort }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "#c33" }}>Error: {error}</p>;
  if (!apiData?.results) return <p>Loading...</p>;

  const iconFor = (field) => {
    if (!sortOrder?.startsWith(field)) return "";
    return sortOrder.endsWith(":ASC") ? " ▲" : " ▼";
  };

  const toggleSort = (field) => {
    onSort(sortOrder === `${field}:ASC` ? `${field}:DESC` : `${field}:ASC`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => toggleSort("Country")}>Country{iconFor("Country")}</th>
          <th onClick={() => toggleSort("Continent")}>Continent{iconFor("Continent")}</th>
          <th onClick={() => toggleSort("Population")}>Population{iconFor("Population")}</th>
          <th onClick={() => toggleSort("PopulationGrowth")}>
            Population Growth{iconFor("PopulationGrowth")}
          </th>
        </tr>
      </thead>
      <tbody>
        {apiData.results.map((r, i) => (
          <tr key={i}>
            <td>{r.Country}</td>
            <td>{r.Continent}</td>
            <td>{r.Population}</td>
            <td>{r.PopulationGrowth}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;