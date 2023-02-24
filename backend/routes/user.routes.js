const express=require("express")
const {UserModel}=require("../models/user.model")
const userRoute=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');

userRoute.get("/",async(req,res)=>{
    await res.send("All the users")
})

userRoute.post("/register",async(req,res)=>{
    const {firstname,lastname,email,password}=req.body
     try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err){
                console.log(err)
            }else{
                const newCustomer= new UserModel({firstname,lastname,email,password:hash})
                await newCustomer.save()
                res.send({"Msg":"Customer Registered Sucessfully"})
            }
           
        });
        
     }
     catch(err){
        console.log({"Msg":"Enter valid Details"})
        res.send(err)
     }
})

userRoute.post("/login",async(req,res)=>{
 
    const {email,password}=req.body

    try{
        const user=await UserModel.find({email})
        const hashedPassword=user[0].password
        if(user.length>0){
            bcrypt.compare(password,hashedPassword,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key);
                    res.send({"msg":"Login successful","token":token})
                }else{
                    res.send({"Msg":"wrong credentials"})
                }
            })
        }else{
            res.send({"Msg":"wrong credentials"})
        }
    }
    catch(err){

    }
})

module.exports={
    userRoute
}