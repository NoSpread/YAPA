import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'

import QuizModel from './quiz.model'

class QuizController implements IControllerBase {
    public path = '/quiz'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(this.path, this.getQuiz)
    }

    private getQuiz = (req: Request, res: Response) => {
        const quiz = new QuizModel

        quiz.getQuiz()
            .then(quiz => {
                res.send(quiz)
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

export default QuizController
