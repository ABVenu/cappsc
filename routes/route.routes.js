const express = require("express");
const routeModel = require("../models/route.models");

const routeRouter = express.Router()

routeRouter.post("/", async (req,res)=>{
    let data = await routeModel.create(req.body)
    res.json({msg:data})
})

module.exports = routeRouter