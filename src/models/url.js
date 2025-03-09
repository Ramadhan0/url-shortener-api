import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize'

import User from './user'

const Url = sequelize.define('Urls', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  short_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  clicks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true,
})

export default Url
