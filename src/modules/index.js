import express from 'express'
import urlShortenerRouter from './urlShortener/index.js'

const appRouter = express.Router()

appRouter.use('/url', urlShortenerRouter)

export default appRouter
