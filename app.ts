import { connect } from 'http2'
import app from './index'
import connectdb from './config/dbConnection'
const PORT=process.env.PORT
app.listen(PORT, async()=>{
    await connectdb()
    console.log(`app is running on ${PORT}`)
    
})