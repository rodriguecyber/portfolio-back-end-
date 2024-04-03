import express from 'express'
import  mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes'
import messageRouter from './routes/messageRouter'
import blogRouter from './routes/blogRouter'
import docRouter from './swagger/swaggerOptions'
import bodyParser = require('body-parser')
dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

const MONGODBURI=process.env.MONGOURI as string
app.use(express.json())
mongoose.connect(MONGODBURI)
const db=mongoose.connection
db.once('open',()=>{
console.log('database connected')
})
db.on('error',()=>{
    console.log("Error in connecting to the database")
})
app.use('/brand',userRouter)
app.use('/brand',messageRouter)
app.use('/brand',blogRouter)
app.use('/api-doc',docRouter)
export default app