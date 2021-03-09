import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'
import DB from '../../database'

import APITestModel from './apitest.model'

class APITestController implements IControllerBase {
    public path = '/test'
    public add = '/user/add'
    public verify = '/user/login'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path, this.getTest)
        this.router.post(this.path, this.postTest)
        this.router.post(this.add, this.useradd)
        this.router.post(this.verify, this.login)
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

    private useradd = (req: Request, res: Response) => {
        const db = new DB()
        db.initSQL()
            .then(() => {
                return db.createUser(req.body.username, req.body.password)
            })
            .then(ress => {
                res.send(ress)
            })
            .catch(err => {
                res.json(err)
            })
    }

    private login = (req: Request, res: Response) => {
        const db = new DB()
        db.initSQL()
            .then(() => {
                return db.verifyUser(req.body.username, req.body.password)
            })
            .then(ress => {
                console.log(ress)
                res.send(ress)
            })
            .catch(err => {
                console.log(err)
                res.send(`${err}`)
            })
    }
}

export default APITestController
