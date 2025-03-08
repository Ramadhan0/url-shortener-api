import response from '../../helpers/responseHelper'
import { findUser, registerUser } from './authService'
import { generateToken, hashPassword, validatePassword } from '../../helpers/commomHelpers'


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
    const token = generateToken(newUser)

    return response(res, 201, "Registered", { 
      user: { username, email, createdAt: newUser.createdAt },
      token
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
    // Find user by email
    const user = await findUser(email)
    if (!user) return response(res, 400, 'Invalid credentials')

    // validate password
    const isPwValid = await validatePassword(password, user.password_hash)
    if (!isPwValid) return response(res, 400, 'Invalid credentials')

    // Generate JWT Token
    const token = generateToken(user)

    return response(res, 200, 'Success', { token, user })
  } catch (error) {
    console.error('Error during login:', error)
    return response(res, 500, 'Internal server error')
  }
}
