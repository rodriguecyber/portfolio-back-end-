import app from './index'
const PORT=process.env.PORT
app.listen(PORT, ()=>{
    console.log(`app is running on ${PORT}`)
    
})