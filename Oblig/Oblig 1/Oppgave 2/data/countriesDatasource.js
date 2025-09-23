const BASE_URL = "https://d6wn6bmjj722w.population.io/1.0/"


export class CountriesDatasource {

  /// Hent JSON fra API, returner null ved feil
  async getAPIRequest(path) {
    const request = await fetch(BASE_URL + path);
    
    if (!request.ok) {
      console.warn(`[countries] ${request.status} ${path}`);
      return null;
    }
    return request.json();
  }
  
  // hent dagens og morgendagens populasjon for et land
  fetchPopTodayTomorrowRaw(countryName) {
    const name = encodeURIComponent(countryName);
    const result = this.getAPIRequest(`population/${name}/today-and-tomorrow/?format=json`);
    return result;
  }
}

