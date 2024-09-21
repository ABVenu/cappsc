const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:String,
    balance:{type:Number, default:5000},
    bookings:[{type:mongoose.Schema.Types.ObjectId, ref:"Booking"}]
    

})

const userModel = mongoose.model("User", UserSchema)

module.exports = userModel