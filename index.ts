
import  mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes'
import messageRouter from './routes/messageRouter'
import blogRouter from './routes/blogRouter'
import docRouter from './swagger/swaggerOptions'
import bodyParser = require('body-parser')
import  cors from 'cors'
import express = require('express')
dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

app.use(cors())
app.use('/brand',userRouter)
app.use('/brand',messageRouter)
app.use('/brand',blogRouter)
app.use('/api-doc',docRouter)
export default app