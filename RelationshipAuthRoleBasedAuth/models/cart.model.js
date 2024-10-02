const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
    buyerId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    products:[{type:mongoose.Schema.Types.ObjectId, ref:"Product"}],
    totalValue:Number
    
}
)

const cartModel = mongoose.model("Cart", CartSchema)

module.exports = cartModel;