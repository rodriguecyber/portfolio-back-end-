import messageSchema from "../models/message";
import express  from "express";
import { userAuth } from "../middleware/userAuth";
import subscriber from "../models/subscriber";
import transport from "../middleware/transpoter";
const messageRouter = express()
messageRouter.post('/Sendmessage',async(req,res)=>{
    const message= new messageSchema({
    name:req.body.name,
    email:req.body.email,
    text:req.body.text,
    time:Date.now(),
    
    })
    try{
await message.save()

.then(async(result)=>{
  const subscribed:boolean=req.body.subscribe
    if(subscribed===true){
        try {
      await subscriber.create({name:result.name,email:result.email})
      const mailOptions={
        from:'rodrirwigara@gmail.com',
        to:result.email as string,
        subject:'subscription',
        text:`Mr/Mrs ${result.name} thank you for subscribe to our Website`
     }
     transport.sendMail(mailOptions,(error,info)=>{
     if(error){
        res.send(error)
     }
     else{
        res.json()
     }
     })
    }
    catch(error:any){
    if(error.code===11000){
        const mailOptions={
            from:'rodrirwigara@gmail.com',
        to:result.email as string,
        subject:'subscription',
        text:`Mr/Mrs ${result.name} thank you for contact us`
        }
        transport.sendMail(mailOptions,(error,info)=>{
            if(error){
               res.send(error)
            }
            else{
               res.json()
            }
            })
    }
    }
}
    res.send({message:"thank you for contact us"})
    const mailOptions={
        from:'rodrirwigara@gmail.com',
        to:result.email as string,
        subject:'subscription',
        text:`Mr/Mrs ${result.name} thank you for contact us`
        }
    transport.sendMail(mailOptions).then(()=>console.log("Email sent"))
})
.catch((error)=>{
    res.json(error)
})
}
catch(error){
    res.json(error)
}
})

messageRouter.get('/message',userAuth, async(req,res)=>{
    try{
const result= await messageSchema.aggregate([
    {
        $group : {
            _id:'$email',
            latestDate: { $max: '$time' }, 
            message:{
                $push:
                {
                text:"$text",
                sent:"$time"
            }
            }
            
        }
    },
    {
        $sort: { latestDate: -1 } 
    }
])   

    const data=result.map(element => ({       
    Sender:element._id,
        message:element.message.reverse()
    
    
        }));
        res.json(data)
}
catch(error){
    res.json(error)
}

})
messageRouter.delete('/deletemessage/:id',userAuth, async(req,res)=>{
    try{
   await  messageSchema.findByIdAndDelete(req.params.id)
  .then(deleted=>{
    if(deleted===null){
    res.json({message:"message not found"})
} else{
    res.json({message:`message  '${deleted.text}'  deleted`})
}
  })
  .catch(error=>{
    res.json(error.message)
  })
}
catch(error){
    res.json(error)
}
})

export default messageRouter
