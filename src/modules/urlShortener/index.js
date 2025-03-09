import express from 'express'
import { authenticate } from '../../middlewares/authenticationMindleware.js'
import { validateCreateUrl } from '../../middlewares/urlValidationMiddleware.js'
import { getUrl, Urls, createUrl, getUrlAnalytics } from './urlShortenerController.js'

const urlShortenerRouter = express.Router()

urlShortenerRouter.get('/', authenticate, Urls)
urlShortenerRouter.get('/single/:shortUrl', getUrl)
urlShortenerRouter.get('/analytics/:shortUrl', authenticate, getUrlAnalytics)
urlShortenerRouter.post('/shorten', authenticate, validateCreateUrl, createUrl)


export default urlShortenerRouter
