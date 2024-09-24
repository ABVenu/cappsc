const express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const userModel = require("../models/user.model");

const userRouter = express.Router();

var salt = bcrypt.genSaltSync(2);


userRouter.post("/signup", async (req, res) => {
  // req.body
  let hash = bcrypt.hashSync(req.body.password, salt);
  console.log(req.body.password, "->",hash);
  req.body.password = hash
  //console.log(req.body)
  // before storing user details, I used should the password so that it is not human readble
  let user = await userModel.create(req.body)
  res.json({ msg: { data: "Signup Sucessfull" ,user} });
});

userRouter.post("/login", async (req, res) => {
    // req.body
    try{
    let userGivenPassword = req.body.password
    let userData = await userModel.findOne({name:req.body.name})
    let storedHashedPassword = userData.password
    let ans = bcrypt.compareSync(userGivenPassword, storedHashedPassword);
   // console.log(ans)
    if(ans==true){
        let token = jwt.sign({ userId: userData._id}, 'shhhhh',{ expiresIn: 60 * 2});
        // var decoded = jwt.verify(token, 'shhhhh');
        // console.log("token", token,"decoded", decoded)
        res.json({ msg: { data: "Login Sucessfull", token} });
    }else{
        res.json({ msg: { data: "Incorrect Password"} });
    }
    }catch(err){
        res.json({ msg: { data: "Something went wrong, Please Try Again Sometime"} });
    }
    
  });
module.exports = userRouter;
