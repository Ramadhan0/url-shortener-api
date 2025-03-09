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


export const generateAccessToken = (email) => {
    return jwt.sign({ email }, accessTokenSecret, { expiresIn: accessTokenExpiry })
  }
  
  export const generateRefreshToken = async (email) => {
    const newRefreshToken = jwt.sign({ email }, refreshTokenSecret, { expiresIn: refreshTokenExpiry })
    await saveRefreshTokenIntoRedis(newRefreshToken, email)
    return newRefreshToken
}

export const decodeRefreshToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, refreshTokenSecret, (err, decoded) => {
      if (err) return resolve(null)
      resolve(decoded.email)
    })
  })
}


// export const decodeRefleshToken = async() => await new Promise((resolve) => {
//   jwt.verify(token, process.env.REFRESH_TOKENe_SECRET, (err, user) => {
//     if (err) return resolve(null)
//     resolve(user.id)
//   })
// })


