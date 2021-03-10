import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import TransitModel from './transit.model'

class TransitController implements IControllerBase {
    public path = '/transit'
    public router = express.Router()

    private transit

    constructor() {
        this.initRoutes()
        this.transit = new TransitModel
    }

    public initRoutes() {
        this.router.get(this.path, this.getTransit)
    }

    private getTransit = (req: Request, res: Response) => {
        
        this.transit.getTransit()
            .then(transit => {
                res.send(transit)
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

export default TransitController
