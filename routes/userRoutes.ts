import express from 'express'
import User from '../models/usermodel'
import { validateSchema } from '../validate/user valid'
import jwt from 'jsonwebtoken'
import { authorize, userAuth } from '../middleware/userAuth'
import transport from '../middleware/transpoter'
import subscriber from '../models/subscriber'
import bcrypt, { hashSync } from 'bcryptjs'
const userRouter =express()
userRouter.post('/signup', async (req, res) => {
     const password=req.body.password
     const salt=bcrypt.genSaltSync(10)
     const hashedPassword=bcrypt.hashSync(password,salt)
   const newuser = {
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       password: hashedPassword
   };

   const validation = validateSchema.validate(newuser);
   if (validation.error) {
       return res.status(200).json({ error: validation.error});
   }

   try {
       const user = await User.create(newuser);
       return res.json({ message: "Registered Successfully", user });
   } catch (error:any) {
       if (error.code === 11000) {
           return res.status(400).json({ error: 'User already exists' });
       } else {
           return res.status(500).json({ error: error.message });
       }
   }
});



userRouter.post('/login', async (req: any, res) => {
  const password = req.body.password;
  const username = req.body.email;

  try {
    const user = await User.findOne({ email: username });

    if (!user) {
      return res.json({ message: `User ${username} not found`});
    }

        bcrypt.compare(password, user.password, async(err, isMatch) => {
      if (err) {
        throw err; 
      }

      if (isMatch) {
        
        const expire = eval(process.env.TOKEN_EXPIRE as string);
        const token = jwt.sign({ 
         userId: user._id, exp: expire, role: user.role }, 
         process.env.JWT_SECRET as string
        );

        
        req.currentUser = user;

        return res.json({ message: 'Logged in', user: user, token: token });
      } else {
        
        return res.json({ message: 'Password does not match' });
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

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
      const exp=eval(process.env.TOKEN_EXPIRE as string)
   const token = jwt.sign({user:user._id,exp:exp},process.env.JWT_SECRET as string)
   
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
 const salt=bcrypt.genSaltSync(10)
 const hashedPassword=bcrypt.hashSync(password,salt)
jwt.verify(token,process.env.RESET as string,async(error:any,decoded:any)=>{
  
  if(error){
   res.json(error.message); 
   }
   else{
      try{
    const  user=User.findOne({_id:decoded.user})
    await user.updateOne({
      $set:{
     password:hashedPassword
      }
     })
   res.json({message:"Password has been changed successfully!"})
    
   }
   catch(err){
      res.json(error)
   }}
})
 
   
})
userRouter.get('/subscriber',userAuth,authorize('admin','read'),async(req,res)=>{
   try{
   const subscribers = await subscriber.find()
   const subscibeInfo=subscribers.map(result=>({
      name:result.name,
      email:result.email
   }))
   res.json(subscibeInfo)
   }
   catch(error){
      res.json(error)
   }
})
 
export default userRouter