import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import NewsModel from './news.model'

class NewsController implements IControllerBase {
    public path = '/news'
    public pathHeadlines = '/news/headlines'
    public router = express.Router()

    private news

    constructor() {
        this.initRoutes()
        this.news = new NewsModel()
    }

    public initRoutes() {
        this.router.get(this.path, this.getNews)
        this.router.get(this.pathHeadlines, this.getHeadlines)
    }

    private getNews = (req: Request, res: Response) => {
        const query = req.body.query

        if (query) {
            this.news.getNews(query)
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
        } else res.sendStatus(400)
    }

    private getHeadlines = (req: Request, res: Response) => {
        const query = req.body.query

        if (query) {
            this.news.getHeadlines(query)
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
        } else res.sendStatus(400)
    }
}

export default NewsController
