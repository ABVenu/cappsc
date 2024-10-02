const mongoose = require("mongoose")

const conncectToDB  = async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/fscc")
        console.log("Connected to db")
    }catch(err){
        console.log("Failed to connect to db")
    }
}

module.exports = conncectToDB