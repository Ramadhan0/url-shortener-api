
import User from '../../models/user'

export const findUser = async (email) => await User.findOne({ where: { email } })

export const registerUser = async (user) => User.create(user)
