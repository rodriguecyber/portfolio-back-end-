import { stringify } from "qs";
import messageSchema from "../models/message";
import express  from "express";

const messageRouter = express()
messageRouter.post('/Message',async(req,res)=>{
    const message= new messageSchema({
    name:req.body.name,
    email:req.body.email,
    text:req.body.text,
    time:Date.now(),
    })
await message.save()
.then((result)=>{
    res.json({message:`${result.name} sent '${result.text}' at '${result.time}' using '${result.email}'`})
})
.catch((error)=>{
    res.json(error)
})
})

messageRouter.get('/message', async(req,res)=>{
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
        $sort: { latestDate: -1 } // Sort groups by the latest date in descending order
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

export default messageRouter
