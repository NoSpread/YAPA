import * as express from 'express'
import { Request, Response } from 'express'
import authentication from '../../middleware/authentication'
import IControllerBase from '../../interfaces/IControllerBase'

import FortuneModel from './fortune.model'

class FortuneController implements IControllerBase {
    public path = '/fortune'
    public router = express.Router()

    private fortune

    constructor() {
        this.initRoutes()
        this.fortune = new FortuneModel()
    }

    public initRoutes() {
        this.router.get(this.path, authentication, this.getFortune)
    }

    private getFortune = (req: Request, res: Response) => {
        
        this.fortune.getFortune()
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
