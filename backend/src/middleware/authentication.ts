import { Request, Response, NextFunction } from 'express'
import { database } from '../database'

// TODO If cookie set, will always work, implement actually apikey only veriant
const authentication = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        try {
            // TODO Kinda useless ngl
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
