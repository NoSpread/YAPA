export interface WeatherForecast {
    location: Location;
    current:  Current;
    forecast: Forecast;
}

export interface WeatherCurrent {
    location: Location,
    current: Current
}

export interface Current {
    last_updated: string;
    temp_c:       number;
    condition:    CurrentCondition;
    wind_kph:     number;
    wind_dir:     WindDir;
    pressure_mb:  number;
    pressure_in:  number;
    precip_mm:    number;
    humidity:     number;
    cloud:        number;
    feelslike_c:  number;
    vis_km:       number;
    uv:           number;
    gust_kph:     number;
}

export interface CurrentCondition {
    text: string;
    code: number;
}

export enum WindDir {
    s = "S",
    o = "O",
    w = "W",
    n = "N",
    nno = "NNO",
    no = "NO",
    ono = "ONO",
    oso = "OSO",
    so = "SO",
    sso = "SSO",
    ssw = "SSW",
    sw = "SW",
    wsw = "WSW",
    wnw = "WNW",
    nw = "NW",
    nnw = "NNW"
}

export interface Forecast {
    forecastday: Forecastday[];
}

export interface Forecastday {
    date:       Date;
    date_epoch: number;
    day:        Day;
    astro:      Astro;
    hour:       Hour[];
}

export interface Astro {
    sunrise:           string;
    sunset:            string;
    moonrise:          string;
    moonset:           string;
    moon_phase:        string;
    moon_illumination: string;
}

export interface Day {
    maxtemp_c:            number;
    mintemp_c:            number;
    avgtemp_c:            number;
    maxwind_kph:          number;
    totalprecip_mm:       number;
    avgvis_km:            number;
    avghumidity:          number;
    daily_will_it_rain:   number;
    daily_chance_of_rain: string;
    daily_will_it_snow:   number;
    daily_chance_of_snow: string;
    condition:            DayCondition;
    uv:                   number;
}

export interface DayCondition {
    text: string;
    icon: string;
    code: number;
}

export interface Hour {
    time_epoch:     number;
    time:           string;
    temp_c:         number;
    is_day:         number;
    condition:      DayCondition;
    wind_mph:       number;
    wind_kph:       number;
    wind_degree:    number;
    wind_dir:       WindDir;
    pressure_mb:    number;
    precip_mm:      number;
    precip_in:      number;
    humidity:       number;
    cloud:          number;
    feelslike_c:    number;
    feelslike_f:    number;
    windchill_c:    number;
    windchill_f:    number;
    heatindex_c:    number;
    heatindex_f:    number;
    dewpoint_c:     number;
    dewpoint_f:     number;
    will_it_rain:   number;
    chance_of_rain: string;
    will_it_snow:   number;
    chance_of_snow: string;
    vis_km:         number;
    vis_miles:      number;
    gust_mph:       number;
    gust_kph:       number;
    uv:             number;
}

export interface Location {
    name:            string;
    region:          string;
    country:         string;
    lat:             number;
    lon:             number;
    tz_id:           string;
    localtime_epoch: number;
    localtime:       string;
}


export interface ICurrWeatherSelected {
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

export interface IDaySelected {
    date: Date,
    avg_temp: number,
    cond: string,
    wind: number,
    snow: string,
    rain: string
}
export interface IDayForecastSelected extends ICurrWeatherSelected  {
    forecast: IDaySelected[]
}