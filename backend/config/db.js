const mongoose=require("mongoose");
const dotenv=require("dotenv")
dotenv.config();
const connectDB=async()=>{
    try{    
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected")
    }
    catch(err){
        console.log("Error in connecting DB")
    }
}
module.exports=connectDB;