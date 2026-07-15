const User =require( '../models/userModel.js');

const searchUser = async(req,res) => {
  try{
    let {query}=req.query;
    if(!query){
        return res.status(400).json({message:`Enter query first `})
    }
    let users=await User.find({
        $or:[
            {name:{$regex:query,$options:"i"}}
            ,{userName:{$regex:query,$options:"i"}}

        ]
    })
    return res.status(200).json(users)

  }
  catch(err){
    return res.status(500).json({message:`Error in user Searching -> ${err} `})
  }
}

module.exports=searchUser