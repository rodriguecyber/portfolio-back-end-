import jwt from'jsonwebtoken'
import User from '../models/usermodel'
import { NextFunction } from 'express'
 export const userAuth=async(req:any,res:any,next:NextFunction)=>{
  
 const authHeader = req.headers['authorization']
 const token = authHeader && authHeader.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET as string, async(err:any,decoded:any)=>{
    if(err) 
   {
    if(err.message==='jwt expired')
     {
        res.json({message:'token has expired'})
     } else{
        res.json({message:"invalid token"})
     }
    }
    else{
       
        next();
    }
   
    
    })
  }
//   export const reset