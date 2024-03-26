import express from 'express'
import User from '../models/usermodel'
import { validateSchema } from '../validate/user valid'
import jwt from 'jsonwebtoken'
import { userAuth } from '../middleware/userAuth'
import nodemailer from 'nodemailer'

const userRouter =express()
userRouter.post('/signup',async(req,res)=>{
 const newuser={
   firstName:req.body.firstName,
   lastName:req.body.lastName,
   email:req.body.email,
   password:req.body.password,
   role:req.body.role
 }
 const validation =validateSchema.validate(newuser)
 if(validation.error){
res.status(400).json({ error: validation.error.details[0].message });
   
 }
 try
 {
const user =await User.create(newuser)
res.json({message:"Registered Successfully",user})
}
catch(error:any){
if(error.code===11000){
   res.status(409).json('User already exists')
}
else{
   res.json(error)
}
}
 })
 userRouter.get('/login',async(req:any,res)=>{
   const username=req.body.email
   const password=req.body.password
  await User.findOne({email:username})
   .then((user:any)=>{
   if(!user){
      res.json({message:'user not found'})
   }
   else{
      if(user.password===password){
        
         const expire= eval(process.env.TOKEN_EXPIRE as string)
      const token=  jwt.sign({userId:user._id, exp:expire},process.env.JWT_SECRET as string)
      req.currentUser=user
       res.json({message:'logged in',user:user, token:token})
      }
      else{
         res.json({message:'password not match'})
      }
   }
   })
 })
 userRouter.get('/dashboard', userAuth,(req:any,res)=>{
  res.json({message:"signed in as ", user:req.currentUser})
 })
 userRouter.post('/forgot-password',async(req,res)=>{
   const email=req.body.email;
   await User.findOne({email:email})
   .then((user)=>{
   if(!user){
  res.json('user not found')
   }else{
      const exp=eval(process.env.RESETEXP as string)
   const token = jwt.sign({user:user._id,exp:exp},process.env.RESET as string)
   
   var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
   const mailOptions={
      from:'rodrirwigara@gmail.com',
      to:email,
      subject:'reset password',
      text:`http://127.0.0.1:5000/reset-password?token=${token}   don't share token with anyone`
   }
   transport.sendMail(mailOptions,(error,info)=>{
   if(error){
      res.json(error)
   }
   else{
      res.json({message:'token sent. check your email'})
   }
   })
 }
}
)})
userRouter.post('/reset-password',async(req,res)=>{
 const token=req.body.token
 const password=req.body.password
jwt.verify(token,process.env.RESET as string,async(error:any,decoded:any)=>{
  
  if(error){
   res.status(401).json(error.message); 
   }
   else{
      try{
    const  user=User.findOne({_id:decoded.user})
    await user.updateOne({
      $set:{
     password:password
      }
     })
   res.json({message:"Password has been changed successfully!"})
    
   }
   catch(err){
      res.json(error)
   }}
})
 
   
})
 
export default userRouter