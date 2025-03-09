import response from '../helpers/responseHelper'
import { body, validationResult } from 'express-validator'


export const validateRegister = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

  body('email')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, "Validation Error", null, errors.array())
    }

    next()
  }
]

export const validateLogin = [
  body('email')
  .notEmpty().withMessage('email is required')
  .isEmail().withMessage('Valid email is required'),

  body('password')
  .notEmpty().withMessage('password is required'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, "Validation Error", null, errors.array())
    }

    next()
  }
]

export const validateRefreshToken = [
  body('refreshToken')
  .notEmpty().withMessage('refreshToken is required'),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, "Validation Error", null, errors.array())
    }

    next()
  }
]

