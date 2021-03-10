import got from 'got'

class WeatherModel {

    private endpoint = "https://api.weatherapi.com/v1/current.json"
    private apikey = process.env.WEATHER_API_KEY || ""


    public getCurrentWeather = async (location: string): Promise<string> => {
        const result = await got(this.endpoint, {searchParams: {key: this.apikey, q: location, aqi: "no"}})

        if (result.statusCode != 200) {
            throw `Error accessing weather API (${result.statusCode})`
        }
        return result.body
    }

    public getForecastWaether = async (location: string, days: number): Promise<string> => {
        const result = await got(this.endpoint, {searchParams: {key: this.apikey, q: location, aqi: "no", days: days, alerts: "no"}})

        if (result.statusCode != 200) {
            throw `Error accessing weather API (${result.statusCode})`
        }

        return result.body
    }
}

export default WeatherModel
