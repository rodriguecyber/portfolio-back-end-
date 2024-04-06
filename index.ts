import express from 'express'
import  mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes'
import messageRouter from './routes/messageRouter'
import blogRouter from './routes/blogRouter'
import docRouter from './swagger/swaggerOptions'
import bodyParser = require('body-parser')
import  cors from 'cors'
dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

const MONGODBURI=process.env.MONGOURI as string
app.use(express.json())
mongoose.connect(MONGODBURI)
app.use(cors())
app.use('/brand',userRouter)
app.use('/brand',messageRouter)
app.use('/brand',blogRouter)
app.use('/api-doc',docRouter)
export default app