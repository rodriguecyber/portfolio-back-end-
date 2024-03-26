import blogs from "../models/blogs";
import  express  from "express";
import { commentSchema } from "../models/blogs";
import { userAuth } from "../middleware/userAuth";
import { validateBlog } from "../validate/validateBlog";

const blogRouter=express()
  blogRouter.post('/addblogs',userAuth, async (req,res)=>{
  try{
  const newBlog= new blogs({
    title:req.body.title,
    content:req.body.content,
    time:new Date(Date.now()).toISOString()
    
  })
  const validate=validateBlog.validate(newBlog)
if(validate.error){return res.json({error:validate.error.details[0].message})}
  await newBlog.save()
  res.json({message:"blog saved "})
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
    
  blogRouter.post('/comment',async(req,res)=>{
    try{ 

      const newComment = new commentSchema({
        blogId: req.body.blogId,
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
  export default blogRouter