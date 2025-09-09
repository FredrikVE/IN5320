import WeatherIcon from './WeatherIcon.jsx';

export default function WeatherTable({ forecast }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-2 py-1 text-left">Tid</th>
          <th className="px-2 py-1 text-left">Vær</th>
          <th className="px-2 py-1 text-left">Temp</th>
          <th className="px-2 py-1 text-left">Vind</th>
          <th className="px-2 py-1 text-left">Vindkast</th>
          <th className="px-2 py-1 text-left">Retning</th>
        </tr>
      </thead>
      <tbody>
        {forecast.map((entry, i) => (
          <tr key={i} className="border-b">
            <td className="px-2 py-1">
              {new Date(entry.time).toLocaleTimeString('no-NO', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </td>
            <td className="px-2 py-1">
              <WeatherIcon symbol={entry.weatherSymbol} size={24} />
            </td>
            <td className="px-2 py-1">{entry.temperature}°C</td>
            <td className="px-2 py-1">{entry.windSpeed} m/s</td>
            <td className="px-2 py-1">{entry.windSpeedGust} m/s</td>
            <td className="px-2 py-1">{entry.windFromDirection}°</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
