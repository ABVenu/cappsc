const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:String,
    password:String,
    mobile:String,
    todos:[{type:mongoose.Schema.Types.ObjectId, ref:"Todo"}]

})

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;