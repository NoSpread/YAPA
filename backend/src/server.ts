import dotenv from 'dotenv'
dotenv.config({
    path: __dirname + "/../.env"
})

import App from './app'
import express from 'express'
import session from 'express-session'

import {
    database
} from './database'

import loggerMiddleware from './middleware/logger'

import FortuneController from './services/fortune/fortune.controller'
import JokeController from './services/joke/joke.controller'
import TranslateController from './services/translate/translate.controller'
import StocksController from './services/stocks/stocks.controller'
import ActivityController from './services/activity/activity.controller'
import RouteController from './services/routing/route.controller'
import NewsController from './services/news/news.controller'
import QuizController from './services/quiz/quiz.controller'
import WeatherController from './services/weather/weather.controller'
import SightseeingController from './services/sightseeing/sightseeing.controller'
import UserController from './services/user/user.controller'

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node.js docs)
})

process.on('SIGINT', function () {
    console.log('Closing server');
    process.exit(0)
})

/**
 * The declaration of an express session is needed to store values
 * in a custom object, its also needed for typescript type declarations
 */
declare module 'express-session' {
    export interface SessionData {
        user: {
            id: number,
            username: string,
            api: string
        }
    }
}

/**
 * This is the main instance of the REST API.
 * It includes all used controllers and middleware.
 */
const app = new App({
    port: Number(process.env.API_PORT) || 5000,
    controllers: [
        new UserController(),
        new FortuneController(),
        new JokeController(),
        new TranslateController(),
        new StocksController(),
        new ActivityController(),
        new RouteController(),
        new NewsController(),
        new QuizController(),
        new WeatherController(),
        new SightseeingController()
    ],
    middleWares: [
        session({
            secret: process.env.COOKIE_SECRET || "OOOHHH NOOOOOOO",
            resave: true,
            saveUninitialized: true,
            name: "sessionID"
        }),
        express.urlencoded({
            extended: true
        }),
        express.json(),
        loggerMiddleware
    ]
})

/**
 * When the mysql database is ready, the server can start listening to requests
 */
database.initSQL().then(() => {
    app.listen()
})

console.log("STARTING - VERSION 1.0.5")