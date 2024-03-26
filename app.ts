import express from 'express'
import  mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes'
import messageRouter from './routes/messageRouter'
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
app.use(userRouter)
app.use(messageRouter)
app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`)
    
})
