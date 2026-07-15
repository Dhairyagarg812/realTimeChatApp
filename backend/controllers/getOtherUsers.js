const User = require("../models/userModel")


const getOtherUsers = async(req,res) => {
  try{
    const users=await User.find({
        _id:{$ne:req.userId}
    }).select("-password");
    return res.status(200).json(users)
  }
  
  catch(err){
    console.log(err);
    return res.status(500).json({message:`Other users fetching problem ${err}`})
  }
}

module.exports=getOtherUsers