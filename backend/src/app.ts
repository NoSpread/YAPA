import express, { NextFunction, Request, Response } from 'express'
import { Application } from 'express'

/**
 * The express REST instance
 */
class App {

    public app: Application
    public port: number

    /**
     * The constructor links all routes and all middleware together
     * @param appInit Takes an object as input that includes the port, middleware functions and controller functions
     */
    constructor(appInit: { port: number, middleWares: any, controllers: any }) {
        this.app = express()
        this.port = appInit.port

        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)

        this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
            res.redirect(process.env.CATCH_ALL_DOMAIN || "https://nospread.xyz")
        })
    }

    /**
     * A function that initiates all middleware dynamically
     * @param middleWares An array of middleware classes
     */
    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    /**
     * A function that initiates all controllers dynamically
     * @param controllers An array of controllers instances
     */
    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`app listening on the http://localhost:${this.port}`)
        })
    }
}

export default App
