import express from 'express'
import authRouter from './auth'
import urlShortenerRouter from './urlShortener/index.js'


const appRouter = express.Router()

appRouter.use('/auth', authRouter)
appRouter.use('/urls', urlShortenerRouter)


export default appRouter
