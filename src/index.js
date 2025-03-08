import morgan from 'morgan'
import dotenv from 'dotenv'
import './models/url.js'
import express from 'express'
import './models/user.js'
import { createClient } from 'redis'
import appRouter from './modules/index.js'
import cookieParser from 'cookie-parser'
import sequelize from './config/sequelize.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT
const redis_url = process.env.REDIS_URL

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Redis client setup
const redisClient = createClient({
  url: redis_url
})

redisClient.on('error', (err) => console.error('Redis Client Error', err))
redisClient.connect().then(() => console.log('Connected to Redis'))

app.use('/api/v1', appRouter)


sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database Synced'))
  .catch((err) => console.error('❌ Sync Error:', err))


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export { redisClient }
