import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import SightseeingModel from './sightseeing.model'

class SightseeingController implements IControllerBase {
    public path = '/sightseeing'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path, this.getSightseeing)
    }

    private getSightseeing = (req: Request, res: Response) => {
        const sightseeing = new SightseeingModel

        sightseeing.getSightseeing()
            .then(sightseeing => {
                res.send(sightseeing)
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

export default SightseeingController
