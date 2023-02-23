const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String

})

const UserModel=mongoose.model("customer",userSchema)

module.exports={
    UserModel
}