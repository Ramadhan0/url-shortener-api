import response from '../../helpers/responseHelper'
import { findUser } from '../auth/authService'


export const getUser = async (req, res) => {  
    try {
      // Find user
      const { email } = req.user
      const user = await findUser(email)
      if (!user) return response(res, 400, 'Invalid credentials')
  
      return response(res, 200, 'Success', { username: user.username, email: user.email })
    } catch (error) {
      console.error('Error during login:', error)
      return response(res, 500, 'Internal server error')
    }
  }