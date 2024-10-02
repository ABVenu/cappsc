const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
    name:{type:String, required:true},
    description:{type:String},
    price:{type:Number, required:true, default:100},
    stock:{type:Number, required:true, default:10},
    sellerId:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
}
)

const productModel = mongoose.model("Product", ProductSchema)

module.exports = productModel;