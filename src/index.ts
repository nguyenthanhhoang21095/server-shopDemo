import * as dotenv from 'dotenv'
import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import ProductRouter from './routes/Product'
import UserRouter from './routes/User'
import CartRouter from './routes/Cart'
import { connectDatabase } from './common/connectDatabase'

dotenv.config()

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

connectDatabase();

app.use('/api/product', ProductRouter)
app.use('/api/user', UserRouter)
app.use('/api/cart', CartRouter)

http.createServer(app).listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`)
})
