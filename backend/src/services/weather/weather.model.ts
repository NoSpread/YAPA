import got from 'got'
import { Weather, IDaySelected, IDayForecastSelected, ICurrWeatherSelected } from './IWeather'

class WeatherModel {

    private endpoint = "https://api.weatherapi.com/v1/"
    private apikey = process.env.WEATHER_API_KEY || ""


    public getCurrentWeather = async (location: string): Promise<ICurrWeatherSelected> => {
        const result = await got<Weather>(this.endpoint + "current.json", {searchParams: {key: this.apikey, q: location, aqi: "no"}, responseType: 'json'})
        if (result.statusCode != 200) {
            throw new Error(`Error accessing weather API (${result.statusCode})`)
        }
        
        const { location: locationObj, current: currentObj } = result.body

        const weatherData: ICurrWeatherSelected = {
            location: {
                name: locationObj.name,
                region: locationObj.region,
                country: locationObj.country
            },
            weather: {
                update: currentObj.last_updated,
                temp: currentObj.temp_c,
                cond: currentObj.condition.text,
                wind: {
                    dir: currentObj.wind_dir,
                    speed: currentObj.wind_kph
                }
            }
        }

        return weatherData

    }

    public getForecastWaether = async (location: string, days: number): Promise<IDayForecastSelected> => {
        const result = await got<Weather>(this.endpoint + "forecast.json", {searchParams: {key: this.apikey, q: location, aqi: "no", days: days, alerts: "no"}, responseType: "json"})

        if (result.statusCode != 200) {
            throw `Error accessing weather API (${result.statusCode})`
        }

        const forecastObj = result.body.forecast!.forecastday
        const { location: locationObj, current: currentObj } = result.body

        const getDayObject = (): IDaySelected[] => {

            const dayarr: IDaySelected[] = []
            for (const day of forecastObj) {
                const dayObj: IDaySelected = {
                    date: day.date,
                    avg_temp: day.day.avgtemp_c,
                    cond: day.day.condition.text,
                    wind: day.day.maxwind_kph,
                    snow: day.day.daily_chance_of_snow,
                    rain: day.day.daily_chance_of_rain
                }
                dayarr.push(dayObj)
            }
            return dayarr
        }

        const weatherData: IDayForecastSelected = {
            location: {
                name: locationObj.name,
                region: locationObj.region,
                country: locationObj.country
            },
            weather: {
                update: currentObj.last_updated,
                temp: currentObj.temp_c,
                cond: currentObj.condition.text,
                wind: {
                    dir: currentObj.wind_dir,
                    speed: currentObj.wind_kph
                }
            },
            forecast: getDayObject()
        }

        return weatherData
    }
}

export default WeatherModel
