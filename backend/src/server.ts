import dotenv from 'dotenv'
dotenv.config({ path: __dirname + "\\..\\.env"})

import App from './app'
import express from 'express'
import cors from 'cors'

//import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

// import PostsController from './controllers/posts/posts.controller'
// import HomeController from './controllers/home/home.controller'

import APITestController from './services/apitest/apitest.controller'
import FortuneController from './services/fortune/fortune.controller'
import JokeController from './services/joke/joke.controller'
import TranslateController from './services/translate/translate.controller'
import StocksController from './services/stocks/stocks.controller'

import ActivityController from './services/activity/activity.controller'
import DrivingController from './services/driving/driving.controller'
import NewsController from './services/news/news.controller'
import QuizController from './services/quiz/quiz.controller'
import SightseeingController from './services/sightseeing/sightseeing.controller'
import TransitController from './services/transit/transit.controller'

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node.js docs)
  })

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
        new StocksController(),
        // new HomeController(),
        // new PostsController()
		
		new  ActivityController(),
		new  DrivingController(),
		new  NewsController(),
		new  QuizController(),
		new  SightseeingController(),
		new  TransitController()
	],
    middleWares: [
        cors(corsSettings),
        express.urlencoded({extended: true}),
        express.json(),
        loggerMiddleware
    ]
})

app.listen()
