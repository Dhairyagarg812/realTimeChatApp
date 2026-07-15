const express=require("express");
const isAuth = require("../middlewares/isAuth");
const getCurrentUser  = require("../controllers/user");
const editProfile = require("../controllers/editProfile");
const upload = require("../middlewares/multer");
const getOtherUsers = require("../controllers/getOtherUsers");
const userRouter=express.Router();
const searchUser=require("../controllers/searchUser")

userRouter.get("/current",isAuth,getCurrentUser);
userRouter.put("/profile",isAuth,upload.single("image"),editProfile)
userRouter.get("/others",isAuth,getOtherUsers)
userRouter.get("/search",isAuth,searchUser);

module.exports=userRouter;
