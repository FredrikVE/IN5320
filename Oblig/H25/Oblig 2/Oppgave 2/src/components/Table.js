export default function Table({ rows, loading, error }) {
  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "#c33" }}>Error: {error}</p>;
  if (!rows || rows.length === 0) return <p>No results.</p>;

  // Omdanner tall fra string med Intl for å få riktige skilletegn og desimaler
  const formatPopulation = new Intl.NumberFormat(); // Konverterer populasjon til heltall
  const formatPopulationGrowth = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }); // 0–2 desimaler for vekst

  return (
    <table className="infoTable">
      <thead>
        <tr>
          {/* scope="col" forteller skjermlesere at dette er kolonneoverskrifter */}
          <th scope="col">Country</th>
          <th scope="col">Continent</th>
          <th scope="col">Population</th>
          <th scope="col">Population Growth</th>
        </tr>
      </thead>
      <tbody>

        {/* Lager én <tr> per land med formaterte verdier fra API */}
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
  );
}