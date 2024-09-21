const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    route:{type:mongoose.Schema.Types.ObjectId, ref:"Route"},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    seatNumber:Number,
    doj:Date,
    status:Boolean

})

const bookingModel = mongoose.model("Booking", BookingSchema)

module.exports = bookingModel;
