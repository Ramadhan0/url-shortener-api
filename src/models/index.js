import User from './user.js'
import Url from './url.js'

// One User has many URLs
User.hasMany(Url, { foreignKey: 'user_id' })

// Each URL belongs to one User
Url.belongsTo(User, { foreignKey: 'user_id' })
