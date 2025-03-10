import express from 'express'
import { getUser } from './userController.js'
import { authenticate } from '../../middlewares/authenticationMindleware.js'


const userRouter = express.Router()

userRouter.get('/', authenticate, getUser)


export default userRouter
