const express=require("express");
const {SignUp,SignIn,LogOut} = require("../controllers/auth");
const authRouter=express.Router();
authRouter.post("/signup",SignUp);
authRouter.post("/signin",SignIn);
authRouter.post("/logout",LogOut);



module.exports=authRouter;