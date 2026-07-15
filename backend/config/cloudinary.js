const cloudinaryPackage = require("cloudinary");
const dotenv=require("dotenv")
dotenv.config();
const cloudinary = cloudinaryPackage.v2;
const fs=require("fs");
const { findPackageJSON } = require("module");

const uploadOnCloudinary=async(filePath)=>{
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_NAME , 
        api_key:process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_SECRET_KEY // Click 'View API Keys' above to copy your API secret
    });

    try{
        const uploadResult = await cloudinary.uploader
        .upload(filePath)
        fs.unlinkSync(filePath)
        return uploadResult.secure_url;
        
    }
    catch(err){
        fs.unlinkSync(filePath)
        console.log("Error In Cloudinary Upload ->"+err)
    }
    
}
module.exports=uploadOnCloudinary;