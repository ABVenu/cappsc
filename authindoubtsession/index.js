const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.routes");
const todoRouter = require("./routes/todo.routes");
const app = express()
app.use(express.json())


app.use("/users", userRouter)
app.use("/todos", todoRouter)
app.listen(8080, async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/ccauth")
        console.log("connected to db")
    }catch(err){
        console.log("Failed to connect to db")
    }
    console.log("server started")
})