import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import StocksModel from './stocks.model'

class StocksController implements IControllerBase {
    public path = '/stock'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post(this.path, this.postStocks)
    }

    private postStocks = (req: Request, res: Response) => {
        const stocks = new StocksModel
        const symbol = req.body.symbol

        stocks.getStocks(symbol)
            .then(stock => {
                res.send(stock)
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

export default StocksController
