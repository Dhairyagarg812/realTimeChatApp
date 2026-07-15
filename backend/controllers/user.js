const User=require("../models/userModel")
 const getCurrentUser=async(req,res)=>{
  try{
    let userId=req.userId;
    let user=await User.findById(userId).select("-password");
    if(!user){
      return res.status(400).json({message:"User not found"});
    }
    return res.status(200).json(user);
  }
  catch(err){
    return res.status(500).json({message:"User retreival error"})
  }
}
module.exports=getCurrentUser