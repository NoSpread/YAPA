import * as express from 'express'
import {
    Request,
    Response
} from 'express'
import authentication from '../../middleware/authentication'
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
        this.router.post(this.path, this.getNews)
        this.router.post(this.pathHeadlines, authentication, this.getHeadlines)
    }

    private getNews = (req: Request, res: Response) => {
        const topic = req.body.topic

        if (topic) {
            this.news.getNews(topic)
                .then(news => {
                    res.send(news)
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

    private getHeadlines = (req: Request, res: Response) => {
        const topic = req.body.topic

        if (topic) {
            this.news.getHeadlines(topic)
                .then(news => {
                    res.send(news)
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

export default NewsController