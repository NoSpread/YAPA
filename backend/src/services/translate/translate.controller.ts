import * as express from 'express'
import {
    Request,
    Response
} from 'express'
import authentication from '../../middleware/authentication'
import IControllerBase from '../../interfaces/IControllerBase'

import TranslateModel from './translate.model'

class TranslateController implements IControllerBase {
    public path = '/translate'
    public router = express.Router()

    private translate

    constructor() {
        this.initRoutes()
        this.translate = new TranslateModel
    }

    public initRoutes() {
        this.router.post(this.path, authentication, this.postTranslation)
    }

    private postTranslation = (req: Request, res: Response) => {
        const {
            query,
            source,
            target
        } = req.body

        if (query && source && target) {
            this.translate.postTranslate(query, source, target)
                .then(translation => {
                    res.json(translation)
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

export default TranslateController