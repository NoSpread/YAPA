import { Request, Response, NextFunction } from 'express'
import { database } from '../database'

/**
 * This middleware checks if the user is authenticated
 * @param req Express
 * @param res Express
 * @param next Express
 */
const authentication = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        try {
            const valid = await database.verifyAPIKey(req.session.user.api)
            if (valid) {
                next()
            } else {
                const err = {
                    type: "PERMISSION_ERROR",
                    e: "InvalidSession"
                }
                res.status(401).json(err)
            }
        } catch (error) {
            res.sendStatus(500)
        }
    } else if (req.headers['x-api-key']) {
        try {
            const key = req.headers['x-api-key'].toString()
            const valid = await database.verifyAPIKey(key)
            if (valid) {
                req.body.apikey = key
                next()
            } else {
                const err = {
                    type: "PERMISSION_ERROR",
                    e: "InvalidAPIKey"
                }
                res.status(401).json(err)
            }
        } catch (error) {
            res.sendStatus(500)
        }
    } else {
        const err = {
            type: "PERMISSION_ERROR",
            e: "MissingSessionOrAPIKey"
        }
        res.status(401).json(err)
    }
}

export default authentication
