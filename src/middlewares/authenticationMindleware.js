import jwt from 'jsonwebtoken'
import response from '../helpers/responseHelper'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return response(res, 401, "Unauthorized", "No token, authorization denied")
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return response(res, 401, "Unauthorized", "Invalid token")
  }
}
