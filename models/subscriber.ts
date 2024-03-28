import mongoose from "mongoose";
  const subscriberSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    }
  })
  const subscriber=mongoose.model('subscriber',subscriberSchema)
  export default subscriber