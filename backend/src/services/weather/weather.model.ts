import got from 'got'

class WeatherModel {

    private endpoint = "https://api.weatherapi.com/v1/forecast.json"
	private apikey = process.env.WEATHERAPI_API_KEY || ""
	
    public async getWeather(query: string, days: string ): Promise<string> {
        const requestObj = {
			q: query,
			day: days,
			key: this.apikey,
			aqi: "no",
			alerts: "no"
		}
		
		const result = await got(this.endpoint, {
			json: requestObj
		})

        if (result.statusCode != 200) {
            throw `Error accessing weather API (${result.statusCode})`
        }
		const resultObj = JSON.parse(result.body);
		const resultData = {
			current: {
				temp: resultObj.current.temp_c,
				text: resultObj.current.text,
				wind: resultObj.current.wind_kph,
				humidity: resultObj.current.humidity,
				feel: resultObj.current.feelslike_c
			},
			forecast: {
				avg_temp: resultObj.forecast.forecastday[0].day.avgtemp_c,
				text: resultObj.forecast.forecastday[0].day.condition.text,
				max_wind: resultObj.forecast.forecastday[0].day.maxwind_kph,
				avg_humidity: resultObj.forecast.forecastday[0].day.avghumidity,
				will_it_rain: resultObj.current.forecast.forecastday[0].day.daily_will_it_snow || 
				resultObj.current.forecast.forecastday[0].day.daily_will_it_rain
			}
		}

        return JSON.stringify(resultData)
    }
}

export default WeatherModel
