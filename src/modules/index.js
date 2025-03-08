import express from 'express'
import authRouter from './auth'
import urlShortenerRouter from './urlShortener/index.js'


const appRouter = express.Router()

appRouter.use('/auth', authRouter)
appRouter.use('/url', urlShortenerRouter)


export default appRouter
