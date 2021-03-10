import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import DrivingModel from './driving.model'

class DrivingController implements IControllerBase {
    public path = '/driving'
    public router = express.Router()

    private driving

    constructor() {
        this.initRoutes()
        this.driving = new DrivingModel()
    }

    public initRoutes() {
        this.router.get(this.path, this.getDriving)
    }

    private getDriving = (req: Request, res: Response) => {

        this.driving.getDriving()
        .then(driving => {
            res.send(driving)
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

export default DrivingController
