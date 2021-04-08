import * as express from 'express'
import {
    Request,
    Response
} from 'express'
import IControllerBase from '../../interfaces/IControllerBase'
import {
    IUserinformation
} from '../../interfaces/IDatabase'
import authentication from '../../middleware/authentication'
import UserModel from './user.model'


class UserController implements IControllerBase {
    public registerPath = '/user/register'
    public loginPath = '/user/login'
    public logoutPath = '/user/logout'
    public userPath = '/user'

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
        this.router.get(this.userPath, authentication, this.getUser)
        this.router.put(this.userPath, authentication, this.updateUser)
        this.router.delete(this.userPath, authentication, this.deleteUser)
    }

    private register = async (req: Request, res: Response) => {
        const {
            username,
            password
        } = req.body
        if (username && password) {
            const status = await this.user.register(username, password)
            res.sendStatus(status)
        } else res.sendStatus(400)
    }

    private login = async (req: Request, res: Response) => {
        const {
            username,
            password
        } = req.body
        if (username && password) {
            try {
                const status = await this.user.login(username, password)
                if (status) {
                    req.session.user = status
                    res.json(status)
                } else res.sendStatus(401)
            } catch (err) {
                res.sendStatus(404) // user not found
            }
        } else res.sendStatus(400)
    }

    private logout = async (req: Request, res: Response) => {

        const apikey: string | null = req.session.user ? req.session.user.api : req.body.apikey ? req.body.apikey : null

        if (apikey) {
            try {
                const status = await this.user.logout(apikey)
                if (status) {
                    req.session.destroy(err => {
                        res.sendStatus(200)
                    })
                } else res.sendStatus(401)
            } catch (err) {
                res.sendStatus(500) // SQL ERROR
            }

        } else res.sendStatus(401)
    }

    private getUser = async (req: Request, res: Response) => {

        const apikey: string | null = req.session.user ? req.session.user.api : req.body.apikey ? req.body.apikey : null

        if (apikey) {
            try {
                const information = await this.user.get(apikey)
                res.json(information)
            } catch (e) {
                const err = {
                    type: e.code || "USER_ERROR",
                    e: e.message
                }
                res.status(500).json(err)
            }

        } else res.sendStatus(401)
    }

    private updateUser = async (req: Request, res: Response) => {

        const info = req.body
        const apikey: string | null = req.session.user ? req.session.user.api : req.body.apikey ? req.body.apikey : null

        const isInfo = (body: IUserinformation | any): body is IUserinformation => {
            return true
        }

        if (isInfo(info) && apikey) {
            try {
                const information = await this.user.update(info, apikey)
                if (information) res.sendStatus(200)
                else res.sendStatus(401)
            } catch (e) {
                const err = {
                    type: e.code || "UPDATE_ERROR",
                    e: e.message
                }
                res.status(500).json(err)
            }
        } else res.sendStatus(401)
    }

    private deleteUser = async (req: Request, res: Response) => {

        const apikey: string | null = req.session.user ? req.session.user.api : req.body.apikey ? req.body.apikey : null

        if (apikey) {
            try {
                const status = await this.user.delete(apikey)
                if (status) {
                    req.session.destroy(err => {
                        res.sendStatus(200)
                    })
                } else res.sendStatus(401)
            } catch (err) {
                res.sendStatus(500) // SQL ERROR
            }

        } else res.sendStatus(401)
    }
}

export default UserController