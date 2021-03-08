import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import NewsModel from './news.model'

class NewsController implements IControllerBase {
    public path = '/news'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path, this.getNews)
    }

    private getNews = (req: Request, res: Response) => {
        const news = new NewsModel

        news.getNews()
            .then(news => {
                res.send(news)
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

export default NewsController
