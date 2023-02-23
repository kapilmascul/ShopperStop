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
            // Store hash in your password DB.
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

module.exports={
    userRoute
}