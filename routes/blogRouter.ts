import express from "express";
import multer from 'multer';
import fs from "fs";
import { authorize, userAuth } from "../middleware/userAuth";
import { validateBlog } from "../validate/validateBlog";
import transport from "../middleware/transpoter";
import subscriber from "../models/subscriber";
import { ObjectId } from "mongoose";
import { Request } from "express";
import {commentSchema } from "../models/blogs";
import blogs from "../models/blogs";

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dxy33wiax',
   api_key: '991555379284442',
   api_secret: 'ekuY9MDxVtiIeUGqKbLS0V8MTV4'
});

const storage = multer.diskStorage({
  filename: function (req: Request, file: any, cb: (error: Error | null, filename: string) => void) {
    cb(null, file.originalname);
  }
});

const uploadService = multer({ storage: storage });

const blogRouter = express();

blogRouter.post('/addblog', userAuth, uploadService.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image provided");
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newBlog = new blogs({
      title: req.body.title,
      content: req.body.content,
      time: new Date(Date.now()).toISOString(),
      image: result.secure_url
    });

    // const validation = validateBlog.validate(newBlog);

    // if (validation.error) {
    //   res.json(validation.error);
    // } else {
      await newBlog.save();
      const savedEmails = await subscriber.find();
      savedEmails.map(email => {
        const mailOptions = {
          from: 'rodrirwigara',
          to: email.email,
          subject: "New Article",
          text: "Rwigara Brand has new Article"
        };
        transport.sendMail(mailOptions);
      });
      res.json({ message: "Blog saved" });
    // }
  } catch (error) {
    res.json(error);
  }
});



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
            _id:1,
            title:1,
            content:1,
            time:1,
            likes:1,
            image:1,
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
    blogRouter.patch('/like/:id',async (req,res)=>{
      const liked=req.body.liked
      const blogId=req.params.id as unknown as ObjectId
      await blogs.findById(blogId)
      .then(data=>{
        if(!data){
    res.json('no blog found')
        }
        else{
          if(liked){
           data.updateOne(
            {$inc:{likes:1}}         
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