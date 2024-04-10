import jwt from'jsonwebtoken'
import roles from '../models/rolers'
import { NextFunction } from 'express'
 export const userAuth=async(req:any,res:any,next:NextFunction)=>{
  
 const authHeader = req.headers['authorization']
 const token = authHeader && authHeader.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET as string, async(err:any,decoded:any)=>{
    if(err) 
   {
    if(err.message==='jwt expired')
     {
        res.json({message:'token has expired! login again'})

        res.status(401).send('Unauthorized')
           } else{
        res.json({message:"please login"})
     }
    }
    else{
       req.user=decoded
        next();
    }
   
    
    })
  }
 export const authorize=(role:any,permission:any)=>{
   return(req:any,res:any,next:any)=>{
      const userRole=req.user.role
      if(userRole!==role){
         return res.json(`you are not ${role}`)
      }
      if(!roles[userRole].includes(permission)){
         res.json(`in your role '${userRole}' permission to ${permission} is not included` )
      }
      else{
      
         next()
      }
  
         
         }
 }