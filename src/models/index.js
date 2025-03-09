import User from './user'
import Url from './url'

// One User has many URLs
User.hasMany(Url, { foreignKey: 'user_id' })

// Each URL belongs to one User
Url.belongsTo(User, { foreignKey: 'user_id' })
