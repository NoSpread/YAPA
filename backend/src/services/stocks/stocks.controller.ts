import * as express from 'express'
import {
    Request,
    Response
} from 'express'
import authentication from '../../middleware/authentication'
import IControllerBase from '../../interfaces/IControllerBase'

import StocksModel from './stocks.model'

class StocksController implements IControllerBase {
    public path = '/stock'
    public router = express.Router()

    private stocks

    constructor() {
        this.initRoutes()
        this.stocks = new StocksModel
    }

    public initRoutes() {
        this.router.post(this.path, authentication, this.postStocks)
    }

    private postStocks = (req: Request, res: Response) => {

        const symbol = req.body.symbol

        if (symbol) {
            this.stocks.getStocks(symbol)
                .then(stock => {
                    res.json(stock)
                })
                .catch(e => {
                    const error = {
                        type: "REQUEST_ERROR",
                        e: e.name
                    }
                    res.status(503).json(error)
                })
        } else res.sendStatus(400)
    }
}

export default StocksController