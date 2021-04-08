import * as express from 'express'
import {
    Request,
    Response
} from 'express'
import authentication from '../../middleware/authentication'
import IControllerBase from '../../interfaces/IControllerBase'

import WeatherModel from './weather.model'

class WeatherController implements IControllerBase {
    public pathNow = '/weather/now'
    public pathFuture = '/weather/forecast'
    public router = express.Router()

    private weather

    constructor() {
        this.initRoutes()
        this.weather = new WeatherModel
    }

    public initRoutes() {
        this.router.post(this.pathNow, authentication, this.getCurrentWeather)
        this.router.post(this.pathFuture, authentication, this.getForecastWeather)
    }

    /**
     * Get the current weather for a location
     * @param req Express
     * @param res Express
     */
    private getCurrentWeather = (req: Request, res: Response) => {
        const location = req.body.loc

        if (location) {
            this.weather.getCurrentWeather(location)
                .then(weather => {
                    res.json(weather)
                })
                .catch(e => {
                    const error = {
                        type: "REQUEST_ERROR",
                        e: e.name
                    }
                    res.status(503).json(error)
                })
        } else res.sendStatus(400)
    }

    /**
     * Get a weather forecast for a location
     * @param req Express
     * @param res Express
     */
    private getForecastWeather = (req: Request, res: Response) => {
        const {
            loc: location,
            days
        } = req.body

        if (location && days) {
            this.weather.getForecastWaether(location, days)
                .then(weather => {
                    res.json(weather)
                })
                .catch(e => {
                    const error = {
                        type: "REQUEST_ERROR",
                        e: e.name
                    }
                    res.status(503).json(error)
                })
        } else res.sendStatus(400)
    }
}

export default WeatherController