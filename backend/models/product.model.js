const mongoose=require("mongoose")


const productSchema=mongoose.Schema({
    img:String,
    title:String,
    price:String,
    rating:String

})

const ProductModel=mongoose.model("product",productSchema)

module.exports={
    ProductModel
}