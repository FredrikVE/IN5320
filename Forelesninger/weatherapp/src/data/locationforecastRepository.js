import { LocationforecastDataSource } from "./locationforecastDatasource.js";

export class LocationForecastRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async getDailyForecast(lat, lon) {
    const rawData = await this.dataSource.getAPIRequest(lat, lon);
    if (!rawData) return null;

    const timeseries = rawData.properties.timeseries;

    // hent 24 timer fremover, time for time
    const forecast = timeseries.slice(0, 24).map(entry => {
      const details = entry.data.instant.details;
      return {
        time: entry.time,
        temperature: details.air_temperature,
        windSpeed: details.wind_speed,
        windFromDirection: details.wind_from_direction,
        windSpeedGust: details.wind_speed_of_gust,
        weatherSymbol: entry.data.next_1_hours?.summary?.symbol_code
      };
    });

    return forecast;
  }
}

async function main() {
  const dataSource = new LocationforecastDataSource();
  const repository = new LocationForecastRepository(dataSource);

  const lat = 59.86;
  const lon = 10.82;

  const forecast = await repository.getDailyForecast(lat, lon);

  console.log("Værvarsel for neste 24 timer:\n");
  forecast.forEach(entry => {
    console.log(
      `${entry.time} | Temp: ${entry.temperature}°C | Vind: ${entry.windSpeed} m/s ` +
      `(kast: ${entry.windSpeedGust} m/s) fra ${entry.windFromDirection}°` +
      `${entry.weatherSymbol}`
    );
  });
}

main();
