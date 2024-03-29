import * as express from 'express'
import {
    Request,
    Response
} from 'express'
import authentication from '../../middleware/authentication'
import IControllerBase from '../../interfaces/IControllerBase'

import QuizModel from './quiz.model'

class QuizController implements IControllerBase {
    public path = '/quiz'
    public router = express.Router()

    private quiz

    constructor() {
        this.initRoutes()
        this.quiz = new QuizModel()
    }

    public initRoutes() {
        this.router.post(this.path, authentication, this.getQuiz)
    }

    private getQuiz = (req: Request, res: Response) => {
        const amount = req.body.amount

        if (amount) {
            this.quiz.getQuiz(amount)
                .then(quiz => {
                    res.send(quiz)
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

export default QuizController