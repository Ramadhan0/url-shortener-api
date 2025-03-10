import rateLimit from 'express-rate-limit'
import response from '../helpers/responseHelper'

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: (req, res) => response(res, 429, 'Too Many Requests', null, 'Rate limit exceeded. Try again later.'),
  standardHeaders: true,
  legacyHeaders: false,
})
