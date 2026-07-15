const uploadOnCloudinary =require("../config/cloudinary");
const Conversation = require("../models/conversation");
const {io}=require("../socket/socket")
const Message = require("../models/message");
const { getReceiverSocketId } = require("../socket/socket");
const sendMessage=async(req,res)=>{
    try{
        let sender=req.userId;
        let {receiver}=req.params;
        let message=req.body.message;
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
        let conversation=await Conversation.findOne(
            {participants:{$all:[sender,receiver]}}
        )

        let newMessage=await Message.create({
            sender,receiver,message,image
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants:[sender,receiver],
                messages:[newMessage._id]
            })
        }
        else{
            conversation.messages.push(newMessage._id)
                await conversation.save()
        }

        const receiverSocketId=getReceiverSocketId(receiver)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        return res.status(200).json(newMessage)

    }   
    catch(err){
        return res.status(500).json(`Error in message sending -> ${err}`)
    }
}

const getMessages=async(req,res)=>{
    try{
        let sender=req.userId;
        let receiver=req.params.receiver
        let conversation=await Conversation.findOne(
            {participants:{$all:[sender,receiver]}}
        ).populate("messages")
        if (!conversation) {
            return res.status(200).json([]);
          }
        return res.status(200).json(conversation?.messages)
    }
    catch(err){
        return res.status(500).json(`Error in get
            messages -> ${err}`)
    }

}


module.exports={sendMessage,getMessages}