import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../../interfaces/IControllerBase'
import { ILogin } from '../../interfaces/IDatabase'
import authentication from '../../middleware/authentication'
import UserModel from './user.model'


class UserController implements IControllerBase {
    public registerPath = '/user/register'
    public loginPath = '/user/login'
    public logoutPath = '/user/logout'

    public router = express.Router()

    private user

    constructor() {
        this.initRoutes()
        this.user = new UserModel()
    }

    public initRoutes() {
        this.router.post(this.registerPath, this.register)
        this.router.post(this.loginPath, this.login)
        this.router.post(this.logoutPath, authentication, this.logout)
    }

    private register = async (req: Request, res: Response) => {
        const {username, password} = req.body
        if (username && password) {
            const status = await this.user.register(username, password)
            res.sendStatus(status)
        } else res.sendStatus(400)
    }

    private login = async (req: Request, res: Response) => {
        const {username, password} = req.body
        if (username && password) {
            const status = await this.user.login(username, password)
            if (status) {
              req.session.user = status
              res.sendStatus(200)
            } else res.sendStatus(401)
        } else res.sendStatus(400)
    }

    private logout = async (req: Request, res: Response) => {
        const user: ILogin = req.session.user!
        const status = await this.user.logout(user)
        
        if (status) {
            req.session.destroy( err => {
                res.sendStatus(200)
            })
        }
        else res.sendStatus(401)
    }
}

export default UserController
