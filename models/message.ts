import mongoose from 'mongoose'
const message= new mongoose.Schema({
          name:{
            type:String
        },
        email:{
            type:String
        },
        text:String,
        time:Date
})
 const messageSchema=mongoose.model('messages',message)
 export default messageSchema