import App from './app'

import cors from 'cors'
import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

// import PostsController from './controllers/posts/posts.controller'
// import HomeController from './controllers/home/home.controller'

import APITestController from './services/apitest/apitest.controller'

const corsSettings = {
    origin: "http://localhost:5000"
}

const app = new App({
    port: 5000,
    controllers: [
        new APITestController()
        // new HomeController(),
        // new PostsController()
    ],
    middleWares: [
        cors(corsSettings),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()
