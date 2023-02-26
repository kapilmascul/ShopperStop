
const express = require('express')
const productRouter = express.Router()
const {ProductModel} = require('../models/product.model')
// const {auth}=require('../middleware/authan')
productRouter.use(express.json())
// productRouter.use(auth)
productRouter.get('/',async(req,res)=>{

    const note= await ProductModel.find(req.query)
    res.send({data:note})
})

productRouter.post('/create',async(req,res)=>{
    // res.send("notes created")
    const note=new ProductModel(req.body)
    await note.save()
    res.send({data:'note created'})
})


productRouter.delete('/delete/:id',async(req,res)=>{
    const noteid=req.params.id
    await ProductModel.findByIdAndDelete({_id:noteid})
    res.send("Deleted the note")
})

productRouter.patch("/update/:id", async (req, res) => {
        let Id = req.params.id
        const payload = req.body
        // console.log(payload)
        try {
    
            const note=await ProductModel.findByIdAndUpdate({ _id: Id }, payload)
            console.log(note)
            res.send({msg:"patch req done"})
        } catch (err) {
            console.log(err)
        }
    })
module.exports={
    productRouter
}