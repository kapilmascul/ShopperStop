const express=require("express")
const mongoose=require("mongoose")
const {connection}=require("./configs/connect")
const { productRouter } = require("./routes/product.routes")
const {userRoute}=require("./routes/user.routes")
const cors=require('cors')
const app=express()
app.use(cors())
require('dotenv').config()



app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home page")
})

app.use("/users",userRoute)
app.use("/products",productRouter)


app.listen(process.env.port,async(req,res)=>{
   try{
     await connection
     console.log("Connected to DB")
   }catch(err){
    console.log("Something went wrong")
   }
})