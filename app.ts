import express from 'express'
import  mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes'
import messageRouter from './routes/messageRouter'
import blogRouter from './routes/blogRouter'
dotenv.config()
const app = express()
const PORT=process.env.PORT
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
app.use('/api',userRouter)
app.use('/api',messageRouter)
app.use('/api',blogRouter)
app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`)
    
})
