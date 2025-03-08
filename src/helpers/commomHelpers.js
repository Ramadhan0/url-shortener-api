import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const validatePassword = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword)

export const generateToken = (user) => jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
