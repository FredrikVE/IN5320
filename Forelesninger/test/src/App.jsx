import { useEffect, useState } from 'react'
import { LocationforecastDataSource } from './data/locationforecastDatasource.js'
import { LocationForecastRepository } from './data/locationforecastRepository.js'
import WeatherTable from './components/WeatherTable.jsx'
import './styles/App.css'

function App() {
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    const dataSource = new LocationforecastDataSource()
    const repository = new LocationForecastRepository(dataSource)

    async function loadForecast() {
      const lat = 59.86
      const lon = 10.82
      const data = await repository.getDailyForecast(lat, lon)
      setForecast(data)
    }

    loadForecast()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Værvarsel neste 24 timer</h2>
      <WeatherTable forecast={forecast} />
    </div>
  )
}

export default App
