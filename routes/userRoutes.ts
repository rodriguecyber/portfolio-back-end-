import express from 'express'
import User from '../models/usermodel'
import { validateSchema } from '../validate/user valid'
import { Error } from 'mongoose'
import jwt from 'jsonwebtoken'
import { userAuth } from '../middleware/userAuth'

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
 userRouter.get('/signout', userAuth,(req:any,res)=>{
  res.json({message:"signed in", user:req.currentUser})
 })
 
export default userRouter