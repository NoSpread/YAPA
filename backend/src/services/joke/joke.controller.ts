import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import JokeModel from './joke.model'

class JokeController implements IControllerBase {
    public path = '/joke'
    public router = express.Router()

    private joke

    constructor() {
        this.initRoutes()
        this.joke = new JokeModel()
    }

    public initRoutes() {
        this.router.get(this.path, this.getJoke)
    }

    private getJoke = (req: Request, res: Response) => {

        this.joke.getJoke()
        .then(joke => {
            res.json(joke)
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

export default JokeController
