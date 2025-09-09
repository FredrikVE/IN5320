const BASE_URL = "https://api.met.no/weatherapi/locationforecast/2.0/complete?";

export class LocationforecastDataSource {
    async getAPIRequest(lat, lon) {
        const request = await fetch(`${BASE_URL}lat=${lat}&lon=${lon}`);

        if (!request.ok) {
            console.warn("Bug");
            return null;
        }

        return request.json();
    }
}

/*
async function main() {
    const dataSource = new LocationforecastDataSource();

    const lat = 59.86;
    const lon = 10.82;

    const data = await dataSource.getAPIRequest(lat, lon);

    console.log(JSON.stringify(data, null, 2));
}

main();
*/