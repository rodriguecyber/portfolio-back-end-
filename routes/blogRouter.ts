import blogs from "../models/blogs";
import  express  from "express";
import { commentSchema } from "../models/blogs";
import { authorize, userAuth } from "../middleware/userAuth";
import { validateBlog } from "../validate/validateBlog";
import transport from "../middleware/transpoter";
import subscriber from "../models/subscriber";


const blogRouter=express()

  blogRouter.post('/addblog',userAuth, async (req,res)=>{
  try{
  const newBlog= new blogs({
    title:req.body.title,
    content:req.body.content,
    time:new Date(Date.now()).toISOString()   
     
  })
   const validation= validateBlog.validate(newBlog)
   if(validation.error){
    res.json(validation.error)
  
   }
   else
  {
    await newBlog.save()
  res.json({message:"blog saved "})
   const savedEmails=await subscriber.find()
   savedEmails.map(email=>{
    const mailOptions={
      from:'rodrirwigara',
      to:email.email,
      subject:"new Article",
      text:"RWigara posted new Article"
    }
    transport.sendMail(mailOptions)
   })
  }

}
catch(error){
     res.json(error)
}
  })

    blogRouter.get('/blogs', async (req, res) => {
      try {
        const blogsWithComments = await blogs.aggregate([
          {
            $lookup: {
              from:"comments", 
              localField: "_id",
              foreignField: "blogId",
              as: "comments"
            }
          },
          {
          $project:{
            _id:0,
            title:1,
            content:1,
            time:1,
            "comments.comment":1,
            "comments.time":1
          }  
          }

        ]);
      res.json(blogsWithComments);
      } catch (error) {
        res.json(error);
      }
    });
    
  blogRouter.post('/comment/:id',async(req,res)=>{
    try{ 

      const newComment = new commentSchema({
        blogId: req.params.id,
        comment:req.body.comment,
        time:new Date(Date.now()).toISOString()  
        
      })
      await newComment.save()
      res.json({message:"commment sent"})
    }
    catch(error){
      res.json(error)
    }
    })
    blogRouter.patch('/updateBlog/:id',userAuth,async(req,res)=>{
      try{
     await  blogs.findByIdAndUpdate(req.params.id,req.body,{new:true})
      .then(updated =>{
        if(updated===null){
          res.json('blog not found')
        }
        else{
          res.json(`blog update to ${updated}` )
        }
      })
      .catch(error=>{
        res.json(error.message)
      })
       }
       catch(error:any){
    res.json(error.mesaage)
       }
    })
    blogRouter.delete('/deleteblog/:id',userAuth,authorize('admin','write'),async(req,res)=>{
     try { 
     await blogs.findByIdAndDelete(req.params.id)
     await commentSchema.deleteMany({blogId:req.params.id})
    .then(deleted=>{
      if(deleted===null) {
        return res.status(404).json("No post found")
    }else{              
      res.status(200).json({blog:`blog  deleted successfull`})
    }})
    .catch(error=>{
      res.json(error)
    })
  }
    catch(error){
      res.json(error)
    }
    })
    blogRouter.post('/like/:id',async (req,res)=>{
      const liked=req.body.liked
      await blogs.findOne({_id:req.params.id})
      .then(data=>{
        if(!data){
    res.json('no blog found')
        }
        else{
          if(liked){
           blogs.updateOne(
            {_id:req.params.id},
            {$inc:{likes:1}},            
              )
           .then(result=>{
            if(!result){
              res.json({message:'failed to like'})
            }
            else{
              res.json({message:`you liked blog "${data.title}`})
            }
           })
          }
          else{
            res.json({message:'please set liked to true'})
          }

        }
        
      })
      
    })
  export default blogRouter 