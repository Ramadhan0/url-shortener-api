import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import response from '../helpers/responseHelper'

dotenv.config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

export const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) return response(res, 401, "Unauthorized", null, "No token, authorization denied")

    const tkn = token.replace('Bearer ', '').trim()
    const decoded = jwt.verify(tkn, accessTokenSecret)

    req.user = decoded.user
    next()
  } catch (error) {
    console.error('JWT Verification Error:', error.message)
    return response(res, 401, "Unauthorized", null, "Invalid or expired token")
  }
}
