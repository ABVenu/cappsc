const mongoose = require("mongoose")


const TodoSchema = new mongoose.Schema({
    title:String,
    status:{type:Boolean, default:false},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
})

const todoModel = mongoose.model("Todo", TodoSchema);

module.exports = todoModel;