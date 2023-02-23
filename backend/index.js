const express=require("express")
const mongoose=require("mongoose")
const {connection}=require("./configs/connect")
const {userRoute}=require("./routes/user.routes")
require('dotenv').config()

const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home page")
})
  
app.use("/users",userRoute)


app.listen(process.env.port,async(req,res)=>{
   try{
     await connection
     console.log("Connected to DB")
   }catch(err){
    console.log("Something went wrong")
   }
})