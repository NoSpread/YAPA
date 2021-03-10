import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import WeatherModel from './weather.model'

class WeatherController implements IControllerBase {
    public path = '/weather'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path, this.getWeather)
    }

    private getWeather = (req: Request, res: Response) => {
        const weather = new WeatherModel
		
		const q = req.body.q
		const days = req.body.days

        weather.getWeather(q,days,aqi,alerts)
            .then(weather => {
                res.send(weather)
            })
            .catch( e => {
                const error = {
                    type: "REQUEST_ERROR",
                    e: e.name
                }
                
                res.status(503).json(error)
            })
    }
}

export default WeatherController
