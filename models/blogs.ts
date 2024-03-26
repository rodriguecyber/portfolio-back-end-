import mongoose from "mongoose";

const blogShema = new mongoose.Schema({
 title:{
    type:String,
    required:true
 },
 content:{
    type:String,
    required:true
 },
 time:{
  type:Date,
  required:true
 },
 likes:{
    type:Number,
    required:true,
    default:0
 }
 

})
const comment=new mongoose.Schema({
   blogId:{type: mongoose.Schema.Types.ObjectId, ref: 'blogs', required:true},
   comment:{type:String,required:true},
   time:{type:Date,required:true},

})
export const commentSchema=mongoose.model('comment',comment)
const blogs=mongoose.model('blogs',blogShema)
export default blogs
