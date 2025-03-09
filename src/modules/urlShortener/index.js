import express from 'express'

import { getUrl, Urls } from './urlShortenerController.js'

const urlShortenerRouter = express.Router()

urlShortenerRouter.get('/all', Urls)
urlShortenerRouter.get('/single/:urlId', getUrl)


export default urlShortenerRouter
