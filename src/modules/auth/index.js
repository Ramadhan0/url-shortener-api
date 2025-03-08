import express from 'express'
import { register, login } from './authController'
import { validateRegister, validateLogin } from '../../middlewares/authValidationMidleware'

const authRouter = express.Router()

authRouter.post('/login', validateLogin, login)
authRouter.post('/register', validateRegister, register)


export default authRouter
