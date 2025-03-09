import response from '../helpers/responseHelper'
import { body, validationResult } from 'express-validator'


export const validateCreateUrl = [
  body('url')
    .notEmpty().withMessage('URL is required')
    .isURL({
      protocols: ['http', 'https'],
      require_protocol: true,
      require_valid_protocol: true,
      require_host: true,
    }).withMessage('Invalid URL format. URL must start with http:// or https://'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, "Validation Error", null, errors.array())
    }

    next()
  }
]


