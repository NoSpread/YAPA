import * as express from 'express'
import {
    Request,
    Response
} from 'express'
import authentication from '../../middleware/authentication'
import IControllerBase from '../../interfaces/IControllerBase'

import ActivityModel from './activity.model'

class ActivityController implements IControllerBase {
    public path = '/activity'
    public router = express.Router()

    private activity

    constructor() {
        this.initRoutes()
        this.activity = new ActivityModel()
    }

    public initRoutes() {
        this.router.get(this.path, authentication, this.getActivity)
    }

    private getActivity = (req: Request, res: Response) => {

        this.activity.getActivity()
            .then(activity => {
                res.json(activity)
            })
            .catch(e => {
                const error = {
                    type: "REQUEST_ERROR",
                    e: e.name
                }
                res.status(503).json(error)
            })
    }
}

export default ActivityController