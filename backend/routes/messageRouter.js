const express=require("express")
const isAuth = require("../middlewares/isAuth");
const messageRouter=express.Router()
const upload = require("../middlewares/multer");
const {sendMessage,getMessages}=require("../controllers/sendMessage");
messageRouter.post("/send/:receiver",isAuth,upload.single("image"),sendMessage)
messageRouter.get("/get/:receiver",isAuth,getMessages)

module.exports=messageRouter;