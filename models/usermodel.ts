import mongoose from 'mongoose'
  const userSchema= new mongoose.Schema({
    firstName:{
            type:String,
            required:true
     },
    lastName:{
            type: String
        },
    email : {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required:true
            },
    password: {
            type: String,
            minlength: 6,
            required:true, 
            },
    role:{
            type:String,
            required:true,
            enum:['user','admin'],
            default:'user'
        }
        
  })
  const User=mongoose.model('user',userSchema)
  export default User