import got from 'got'

class WeatherModel {

    private endpoint = "https://api.weatherapi.com/v1/forecast.json"
	private apikey = process.env.WEATHERAPI_API_KEY || ""
	
    public async getWeather(query: string, days: string ): Promise<string> {
        const requestObj = {
			q: query,
			day: day,
			key: apikey,
			aqi: "no",
			alerts: "no"
		}
		
		const result = await got(this.endpoint, {
			json: requestObj
		})

        if (result.statusCode != 200) {
            throw `Error accessing weather API (${result.statusCode})`
        }
		const resultData = {
			current: {
				temp: result.body.current.temp_c,
				text: result.body.current.text,
				wind: result.body.current.wind_kph,
				humidity: result.body.current.humidity,
				feel: result.body.current.feelslike_c
			},
			forecast: {
				avg_temp: result.body.forecast.forecastday[0].day.avgtemp_c,
				text: result.body.forecast.forecastday[0].day.condition.text,
				max_wind: result.body.forecast.forecastday[0].day.maxwind_kph,
				avg_humidity: result.body.forecast.forecastday[0].day.avghumidity,
				will_it_rain: result.body.current.forecast.forecastday[0].day.daily_will_it_snow || 
					result.body.current.forecast.forecastday[0].day.daily_will_it_rain
			}
		}

        return resultData
    }
}

export default WeatherModel
