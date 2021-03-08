import got from 'got'

class WeatherModel {

    private endpoint = "https://www.weatherapi.com/my/"

    public async getWeather(): Promise<string> {
        const result = await got(this.endpoint)

        if (result.statusCode != 200) {
            throw `Error accessing weather API (${result.statusCode})`
        }
        return result.body
    }
}

export default WeatherModel
