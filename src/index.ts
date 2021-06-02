import * as dotenv from 'dotenv'
import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import ProductRouter from './routes/Product'
import UserRouter from './routes/User'
import CartRouter from './routes/Cart'
import AuthRouter from './routes/Auth'
import OrderRouter from './routes/Order'
import { connectDatabase } from './common/connectDatabase'
import { graphqlHTTP } from 'express-graphql'
import Schema from './Schema/product'
import { authenticateToken, protectedRoute } from './middlewares/authMiddleware'

dotenv.config()

const CronJob = require('cron').CronJob

const cronjobExample = new CronJob('0 0 0 */1 * *', () => {
  // Do cronjob in here
  console.log('active backup db')
  const exec = require('child_process').exec
  exec('bash ./backup.sh')
}, null, true)
cronjobExample.start()

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

connectDatabase()

app.use('/api/auth', AuthRouter)
app.use('/api/product', ProductRouter)
app.use('/api/user', UserRouter)

app.use(authenticateToken, protectedRoute)

app.use('/api/cart', CartRouter)
app.use('/api/order', OrderRouter)

app.use('/graphql', graphqlHTTP({ schema: Schema, pretty: true }))

http.createServer(app).listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`)
})
