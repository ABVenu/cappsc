const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
    number:String,
    from:String,
    to:String,
    price:Number,
    maxSeats:{type:Number, default:5}

})

const routeModel = mongoose.model("Route", RouteSchema)

module.exports = routeModel;