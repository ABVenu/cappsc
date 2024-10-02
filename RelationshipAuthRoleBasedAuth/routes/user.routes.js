const express = require("express");
const userModel = require("../models/user.model");
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const salt = 5;


const userRouter = express.Router();


userRouter.get("/", async(req,res)=>{
    let data = await userModel.find()
    res.json({msg:data})
})

userRouter.post("/signup", async(req,res)=>{
    let userPassword = req.body.password;
    const hash = bcrypt.hashSync(userPassword, salt);
    let data = await userModel.create({...req.body,password:hash})
    res.json({msg:data})
})

userRouter.post("/login", async(req,res)=>{
    let userPassword = req.body.password;
    let data = await userModel.findOne({email:req.body.email})
    if(data){
        const hashedPasswordFromDB = data.password;
        let check= bcrypt.compareSync(userPassword, hashedPasswordFromDB); // true
        if(check){
            var token = jwt.sign({ userid: data._id, role:data.role }, 'shhhhh');
            res.json({msg:"login sucessfull", token})
        }else{
            res.json({msg:"wrong password"})
        }
       
    }else{
        res.json({msg:"user not found"})
    }
    
   
})

module.exports = userRouter;
