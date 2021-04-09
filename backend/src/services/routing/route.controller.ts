import * as express from 'express'
import {
    Request,
    Response
} from 'express'
import authentication from '../../middleware/authentication'
import IControllerBase from '../../interfaces/IControllerBase'
import {
    Mode,
    TimeType
} from './IRoute'

import RouteModel from './route.model'

class RouteController implements IControllerBase {
    public path = '/route/:method'
    public router = express.Router()

    private driving

    constructor() {
        this.initRoutes()
        this.driving = new RouteModel()
    }

    public initRoutes() {
        this.router.post(this.path, authentication, this.getRoute)
    }

    private getRoute = (req: Request, res: Response) => {

        const {
            start,
            end,
            timetype: rtimeType,
            time: dateTime
        } = req.body
        const rmethod = req.params.method
        const method = rmethod === "driving" ? Mode.Driving : rmethod === "transit" ? Mode.Transit : rmethod === "walking" ? Mode.Walking : null

        if (start && end && method) {

            if (method === Mode.Transit) {
                const timeType = rtimeType === "arrival" ? TimeType.Arrival : rtimeType === "departure" ? TimeType.Departure : rtimeType === "lastavailable" ? TimeType.LastAvailable : null

                if (timeType && dateTime) {
                    this.driving.getRoute(start, end, method, timeType, dateTime)
                        .then(route => {
                            res.json(route)
                        })
                        .catch(e => {
                            const error = {
                                type: "REQUEST_ERROR",
                                e: e.name
                            }
                            res.status(503).json(error)
                        })
                } else res.sendStatus(400)
            } else {
                this.driving.getRoute(start, end, method)
                    .then(route => {
                        res.json(route)
                    })
                    .catch(e => {
                        const error = {
                            type: "REQUEST_ERROR",
                            e: e.name
                        }
                        res.status(503).json(error)
                    })
            }
        } else res.sendStatus(400)
    }
}

export default RouteController