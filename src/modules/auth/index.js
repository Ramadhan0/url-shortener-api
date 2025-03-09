import express from 'express'
import { register, login, refreshToken } from './authController';
import { validateRegister, validateLogin, validateRefreshToken } from '../../middlewares/authValidationMidleware'

const authRouter = express.Router()

authRouter.post('/login', validateLogin, login)
authRouter.post('/register', validateRegister, register)
authRouter.post('/refresh-token', validateRefreshToken, refreshToken)


export default authRouter
