interface IRealTime {
    location: {
        name: string,
        region: string,
        country: string,
        lat: number,
        lon: number,
        tz_id: string,
        localtime_epoch: number,
        localtime: string
    },
    current: {
        last_updated: string,
        temp_c: number,
        condition: {
            text: string,
            code: number
        },
        wind_kph: number,
        wind_dir: string,
        pressure_mb: number,
        pressure_in: number,
        precip_mm: number,
        humidity: number,
        cloud: number,
        feelslike_c: number,
        vis_km: number,
        uv: number,
        gust_kph: number
    }
}

interface IForeCast {
    location: {
        name: string,
        region: string,
        country: string,
        lat: number,
        lon: number,
        tz_id: string,
        localtime_epoch: number,
        localtime: string
    },
    current: {
        last_updated: string,
        temp_c: number,
        condition: {
            text: string,
            code: number
        },
        wind_kph: number,
        wind_dir: string,
        pressure_mb: number,
        pressure_in: number,
        precip_mm: number,
        humidity: number,
        cloud: number,
        feelslike_c: number,
        vis_km: number,
        uv: number,
        gust_kph: number
    },
    forecast: {
        forecastday: [
            {
                date: string,
                date_epoch: number,
                day: {
                    maxtemp_c: number,
                    mintemp_c: number,
                    avgtemp_c: number,
                    maxwind_kph: number,
                    totalprecip_mm: number,
                    avgvis_km: number,
                    avghumidity: number,
                    daily_will_it_rain: 1,
                    daily_chance_of_rain: string,
                    daily_will_it_snow: number,
                    daily_chance_of_snow: string,
                    condition: {
                        text: string,
                        icon: string,
                        code: number
                    },
                    uv: number
                },
                astro: {
                    sunrise: string,
                    sunset: string,
                    moonrise: string,
                    moonset: string,
                    moon_phase: string,
                    moon_illumination: string
                },
                hour: [
                    {
                        time_epoch: number,
                        time: string,
                        temp_c: number,
                        is_day: number,
                        condition: {
                            text: string,
                            icon: string,
                            code: number
                        },
                        wind_mph: number,
                        wind_kph: number,
                        wind_degree: number,
                        wind_dir: string,
                        pressure_mb: number,
                        precip_mm: number,
                        precip_in: number,
                        humidity: number,
                        cloud: number,
                        feelslike_c: number,
                        feelslike_f: number,
                        windchill_c: number,
                        windchill_f: number,
                        heatindex_c: number,
                        heatindex_f: number,
                        dewpoint_c: number,
                        dewpoint_f: number,
                        will_it_rain: number,
                        chance_of_rain: string,
                        will_it_snow: number,
                        chance_of_snow: string,
                        vis_km: number,
                        vis_miles: number,
                        gust_mph: number,
                        gust_kph: number,
                        uv: number
                    }
                ]
            }
        ]
    }
}

interface ICurrWeather {
    location: {
        name: string,
        region: string,
        country: string
    },
    weather: {
        update: string,
        temp: number,
        cond: string,
        wind: {
            dir: string,
            speed: number
        }
    }
}

interface IDay {
    date: string,
    avg_temp: number,
    cond: string,
    wind: number,
    snow: string,
    rain: string
}
interface IDayForecast extends ICurrWeather  {
    forecast: IDay[]
}

export { IRealTime, IForeCast, IDay, IDayForecast}