const express = require("express");
const userModel = require("../models/user.model");

const userRouter = express.Router()

userRouter.post("/", async(req,res)=>{
    let data = await userModel.create(req.body)
    res.json({msg:data})
})

userRouter.get("/", async(req,res)=>{
    let data = await userModel.find()
    res.json({msg:data})
})


module.exports = userRouter