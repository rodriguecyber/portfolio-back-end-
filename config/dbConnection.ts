import dotenv  from "dotenv"
import mongoose from "mongoose"
dotenv.config
const connectdb=async()=>{
try{
    const MONGODBURI=process.env.MONGOURI as string
    mongoose.connect(MONGODBURI)
    console.log('connected to database')
}
catch(error){
    console.log(`Error ${error}`);
}
}
export default connectdb