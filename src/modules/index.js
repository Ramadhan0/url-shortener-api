import express from 'express'
import authRouter from './auth'
import userRouter from './user/index.js'
import urlShortenerRouter from './urlShortener/index.js'


const appRouter = express.Router()

appRouter.use('/auth', authRouter)
appRouter.use('/user', userRouter)
appRouter.use('/urls', urlShortenerRouter)


export default appRouter
