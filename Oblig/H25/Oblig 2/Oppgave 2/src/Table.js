// src/Table.js
function Table(props) {
  const { apiData, loading, error } = props;

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "#c33" }}>Error: {error}</p>;

  if (!apiData?.results) {
    return <p>Loading...</p>;
  }

  return (
    <table>
      <thead>...</thead>
      <tbody>
        {apiData.results.map((country, index) => (
          <tr key={index}>
            <td>{country.Country}</td>
            <td>{country.Continent}</td>
            <td>{country.Population}</td>
            <td>{country.PopulationGrowth}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
