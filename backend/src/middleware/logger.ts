import { Request, Response, NextFunction } from 'express'
import Logger from './../logger'

const log = new Logger() 

const loggerMiddleware = (req: Request, resp: Response, next: NextFunction) => {

    log.log(`${req.method} -> ${req.path}`)
    next()
}

export default loggerMiddleware
