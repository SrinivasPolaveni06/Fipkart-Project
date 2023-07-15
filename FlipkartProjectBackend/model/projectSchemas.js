var mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    title: String,
    description: String,
    price:Number,
    createdAt: String,
    original_price:Number,
    img_url:String,
    category:String
})

const Products=mongoose.model("Products",productSchema);

module.exports=Products;