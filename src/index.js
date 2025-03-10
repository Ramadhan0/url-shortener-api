import morgan from 'morgan'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import os from 'os'
import cookieParser from 'cookie-parser'
import { createClient } from 'redis'
import sequelize from './config/sequelize.js'
import appRouter from './modules/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const redis_url = process.env.REDIS_URL
const frontend_port = 5173


const getServerIP = () => {
  const interfaces = os.networkInterfaces()
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (!iface.internal && iface.family === 'IPv4') {
        return iface.address
      }
    }
  }
  return '127.0.0.1'
}

const serverIP = getServerIP()
console.log(`🌐 Server IP: ${serverIP}`)


const corsOptions = {
  origin: [
    `http://${serverIP}:${frontend_port}`,
    `http://localhost:${frontend_port}`
  ],
  credentials: true,
}


app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const redisClient = createClient({ url: redis_url })

redisClient.on('error', (err) => console.error('Redis Client Error', err))
redisClient.connect().then(() => console.log('✅ Connected to Redis'))

app.use('/api/v1', appRouter)

sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database Synced'))
  .catch((err) => console.error('❌ Sync Error:', err))

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://${serverIP}:${PORT}`)
})

export { redisClient }
