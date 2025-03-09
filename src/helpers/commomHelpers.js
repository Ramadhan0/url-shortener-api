import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { saveRefreshTokenIntoRedis } from './redisHelper'


const JwtSecret = process.env.JWT_SECRET
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY


export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const validatePassword = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword)

export const generateToken = (user) => jwt.sign({ id: user.id, email: user.email }, JwtSecret, { expiresIn: refreshTokenExpiry })


export const generateAccessToken = (user) => {
    return jwt.sign({ user }, accessTokenSecret, { expiresIn: accessTokenExpiry })
  }
  
  export const generateRefreshToken = async (user) => {
    console.log(user.user_id)
    const newRefreshToken = jwt.sign({ user }, refreshTokenSecret, { expiresIn: refreshTokenExpiry })
    await saveRefreshTokenIntoRedis(newRefreshToken, user.user_id)
    return newRefreshToken
}

export const decodeRefreshToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, refreshTokenSecret, (err, decoded) => {
      if (err) return resolve(null)
      resolve(decoded.user)
    })
  })
}

export const decodeToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) return resolve(null)
      resolve(decoded.user)
    })
  })
}

