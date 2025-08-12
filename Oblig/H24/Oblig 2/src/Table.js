export default function Table({ rows, loading, error }) {
  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "#c33" }}>Error: {error}</p>;
  if (!rows || rows.length === 0) return <p>No results.</p>;

  return (
    <table className="tbl">
      <thead>
        <tr>
          <th>Country</th>
          <th>Continent</th>
          <th>Population</th>
          <th>Population Growth</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.CountryCode}>
            <td>{r.Country}</td>
            <td>{r.Continent}</td>
            <td>{Number(r.Population).toLocaleString()}</td>
            <td>{Number(r.PopulationGrowth).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
