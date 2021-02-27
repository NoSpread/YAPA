import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import APITestModel from './apitest.model'

class APITestController implements IControllerBase {
    public path = '/test'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path, this.getTest)
        this.router.post(this.path, this.postTest)
    }

    private getTest = (req: Request, res: Response) => {

        const users = [
            {
                name: "Jeremy",
                age: 12
            }, 
            {
                name: "Kevin",
                age: 21
            }
        ]

       res.json(users)
    }

    private postTest = (req: Request, res: Response) => {
        const x = Number(req.body.x)
        const y = Number(req.body.y)
        const calculation = APITestModel.calc(x, y)

        const result = {
            x: x,
            y: y,
            calc: calculation
        }

        res.json(result)
    }
}

export default APITestController
