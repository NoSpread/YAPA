import { Request, Response, NextFunction } from 'express'
import Logger from './../logger'

const log = new Logger() 

/**
 * Log all requests to the REST API
 * @param req Express
 * @param resp Express
 * @param next Express
 */
const loggerMiddleware = (req: Request, resp: Response, next: NextFunction) => {

    log.log(`${req.method} -> ${req.path}`)
    next()
}

export default loggerMiddleware
