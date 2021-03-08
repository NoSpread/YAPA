import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import ActivityModel from './activity.model'

class ActivityController implements IControllerBase {
    public path = '/activity'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path, this.getActivity)
    }

    private getActivity = (req: Request, res: Response) => {
        const activity = new ActivityModel

        activity.getActivity()
            .then(activity => {
                res.send(activity)
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

export default ActivityController
