const mongoose=require("mongoose")
const schema=mongoose.Schema
const Userschema=new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"USER"
    }
})

const UserModel=mongoose.model("user",Userschema)

module.exports=UserModel