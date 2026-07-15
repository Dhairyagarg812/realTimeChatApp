const {Schema, default: mongoose}=require("mongoose");

const userSchma=new Schema ({
    name:{
        type:String,
        min:3
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    }
},{timestamps:true});
const User=mongoose.model("User",userSchma);
module.exports=User;