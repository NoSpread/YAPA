import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'
import SightseeingModel from './sightseeing.model'

class SightseeingController implements IControllerBase {
    public path = '/sightseeing'
    public router = express.Router()

    private sightseeing

    constructor() {
        this.initRoutes()
        this.sightseeing = new SightseeingModel
    }

    public initRoutes() {
        this.router.post(this.path, this.getSightseeing)
    }

    private getSightseeing = (req: Request, res: Response) => {

        const { city, radius } = req.body

        if (city && radius) {
            this.sightseeing.getGeoname(city, radius)
            .then( sightseeing => {
                res.json(sightseeing)
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

export default SightseeingController
