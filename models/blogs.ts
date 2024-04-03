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
  type:String,
  required:true
 },
 
 likes:{
    type:Number,
    required:true,
    default:0
 },
 image:{type:Buffer, contentType:String}
},
{ strict: false }
)
const comment=new mongoose.Schema({
   blogId:{type: mongoose.Schema.Types.ObjectId, ref: 'blogs', required:true},
   comment:{type:String,required:true},
   time:{type:String,required:true},

})
export const commentSchema=mongoose.model('comment',comment)
const blogs=mongoose.model('blogs',blogShema)
export default blogs
