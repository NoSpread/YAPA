import { Request, Response, NextFunction } from 'express'
import { database } from '../database'

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        try {
            const valid = await database.verifyAPIKey(req.session.user)
            if (valid) {
                next()
            } else {
                res.sendStatus(401)
            }
        } catch (error) {
            res.sendStatus(500)
        }
    } else res.sendStatus(401)
}

export default authentication
