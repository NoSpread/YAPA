import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import FortuneModel from './fortune.model'

class FortuneController implements IControllerBase {
    public path = '/fortune'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path, this.getFortune)
    }

    private getFortune = (req: Request, res: Response) => {
        const fortune = new FortuneModel

        fortune.getFortune()
            .then(fortune => {
                res.send(fortune)
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

export default FortuneController
