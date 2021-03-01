import dotenv from 'dotenv'
dotenv.config({ path: __dirname + "\\..\\.env"})

import App from './app'

import cors from 'cors'
import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

// import PostsController from './controllers/posts/posts.controller'
// import HomeController from './controllers/home/home.controller'

import APITestController from './services/apitest/apitest.controller'
import FortuneController from './services/fortune/fortune.controller'
import JokeController from './services/joke/joke.controller'
import TranslateController from './services/translate/translate.controller'
import StocksController from './services/stocks/stocks.controller'

const corsSettings = {
    origin: `${process.env.API_URL || "http://localhost"}:${process.env.API_PORT || 5000}`
}

const app = new App({
    port: Number(process.env.API_PORT) || 5000,
    controllers: [
        new APITestController(),
        new FortuneController(),
        new JokeController(),
        new TranslateController(),
        new StocksController()
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
