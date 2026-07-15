const uploadOnCloudinary = require("../config/cloudinary");
const User = require("../models/userModel");

const editProfile=async(req,res)=>{
    try{
        const {name}=req.body;
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path);

        }
        let user=await User.findByIdAndUpdate(req.userId,{name,image},{new:true})
        return res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"user not found"})
    }
}
module.exports=editProfile;