import blogs from "../models/blogs";
import  express  from "express";
import { commentSchema } from "../models/blogs";
import { userAuth } from "../middleware/userAuth";
import { validateBlog } from "../validate/validateBlog";
import transport from "../middleware/transpoter";
import subscriber from "../models/subscriber";

const blogRouter=express()

  blogRouter.post('/addblogs',userAuth, async (req,res)=>{
  try{
  const newBlog= new blogs({
    title:req.body.title,
    content:req.body.content,
    time:new Date(Date.now()).toISOString()
    
  })
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
catch(error){
     res.json(error)
}
  })

    blogRouter.get('/blog', async (req, res) => {
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
        time:Date.now()
        
      })
      await newComment.save()
      res.json({message:"commment sent"})
    }
    catch(error){
      res.json(error)
    }
    })
    blogRouter.patch('/updateBlog/:id',async(req,res)=>{
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
    blogRouter.delete('/deleteblog/:id',userAuth,async(req,res)=>{
     try { 
    blogs.findByIdAndDelete(req.params.id)
    .then(deleted=>{
      if(deleted===null) return res.status(404).json("No post found")
      res.status(200).json({blog:`blog ${deleted} deleted successfull`})
    })
    .catch(error=>{
      res.json(error)
    })
  }
    catch(error){
      res.json(error)
    }
    })
  export default blogRouter 