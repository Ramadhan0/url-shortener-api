import response from '../../helpers/responseHelper'
import { findUser, registerUser } from './authService'
import { 
  generateToken, hashPassword, validatePassword,
  generateAccessToken, generateRefreshToken, decodeRefreshToken
} from '../../helpers/commomHelpers'
import { getDataFromRedis } from '../../helpers/redisHelper'


// **Register User**
export const register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Check if user already exists
    const isUserExist = await findUser(email)
    if (isUserExist) return response(res, 400, 'User already exists')

    
    // Register user
    const hashedPassword = await hashPassword(password)
    const newUser = await registerUser({ username, email,password_hash: hashedPassword})

    // Generate JWT Token
    // const token = generateToken(newUser)

    const accessToken = generateAccessToken(newUser.email)
    const refreshToken = await generateRefreshToken(newUser.email)

    return response(res, 201, "Registered", { 
      newUser: { username, email, createdAt: newUser.createdAt },
      accessToken, refreshToken
    })
  } catch (error) {
    console.error('Error during registration:', error)
    return response(res, 500, 'Internal server error')
  }
}

// **Login User**
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Find user
    const user = await findUser(email)
    if (!user) return response(res, 400, 'Invalid credentials')

    // validate password
    const isPwValid = await validatePassword(password, user.password_hash)
    if (!isPwValid) return response(res, 400, 'Invalid credentials')

    // Generate JWT Token
    // const token = generateToken(user)

    const accessToken = generateAccessToken(user.email)
    const refreshToken = await generateRefreshToken(user.email)

    return response(res, 200, 'Success', { user: {username: user.username, email: user.email }, accessToken, refreshToken })
  } catch (error) {
    console.error('Error during login:', error)
    return response(res, 500, 'Internal server error')
  }
}

export const refreshToken = async (req, res) => {

  const { refreshToken } = req.body

  try {
    // Find refresh token in Redis
    const email = await decodeRefreshToken(refreshToken)

    if (!email) return response(res, 403, 'Invalid refresh token')

    const redisRefreshToken = await getDataFromRedis(`refreshToken:${email}`)

    console.log(refreshToken)
    console.log(redisRefreshToken)

    if (redisRefreshToken !== refreshToken) return response(res, 403, 'Refresh token mismatch')

    const newAccessToken = generateAccessToken(email)

    return res.json({ accessToken: newAccessToken })
  } catch (error) {
    console.error('Error during login:', error)
    return response(res, 500, 'Internal server error')
  }
}
