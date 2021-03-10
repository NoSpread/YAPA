import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import WeatherModel from './weather.model'

class WeatherController implements IControllerBase {
    public pathNow = '/weather/now'
    public pathFuture = '/weather/forecast'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post(this.pathNow, this.getCurrentWeather)
        this.router.post(this.pathFuture, this.getForecastWeather)
    }

    private getCurrentWeather = (req: Request, res: Response) => {
        const weather = new WeatherModel
        const location = req.body.loc

        if (location) {
            weather.getCurrentWeather(location)
            .then(weather => {
                res.json(weather)
            })
            .catch( e => {
                const error = {
                    type: "REQUEST_ERROR",
                    e: e.name
                }
                res.status(503).json(error)
            })
        } else res.sendStatus(400)
    }

    private getForecastWeather = (req: Request, res: Response) => {
        const weather = new WeatherModel
        const { loc: location, days} = req.body

        if (location && days) {
            weather.getForecastWaether(location, days)
            .then(weather => {
                res.json(weather)
            })
            .catch( e => {
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
