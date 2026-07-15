
const jwt =require("jsonwebtoken");
const dotenv=require( "dotenv")
dotenv.config();
const isAuth = async (req,res,next) => {
    try{
  const token=req.cookies.token;
  const verifyToken= jwt.verify(token,process.env.SECRET_KEY);

  if(!verifyToken){
    return res.status(400).json({message:"Token not found"}) 
  }
  req.userId=verifyToken.userId
  next();
}
catch(err){
    return res.status(500).json({message:`isAuth error ${err}`}) 
}
}

module.exports= isAuth