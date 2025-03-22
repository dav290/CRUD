const mongoose=require('mongoose')

const UserSchema= mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const UserModel= mongoose.model("MongoUsers",UserSchema)

module.exports=UserModel