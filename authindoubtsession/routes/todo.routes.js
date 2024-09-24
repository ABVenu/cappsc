const express = require("express");
const todoModel = require("../models/todo.model");
const authMiddleware = require("../middlewares/auth.middlware");




const todoRouter = express.Router();

todoRouter.use(authMiddleware)

todoRouter.post("/", async (req, res) => {
  // req.body
  //console.log("from todo router", req.body)
 let todo = await todoModel.create(req.body)
  res.json({ msg: { data: "todo added", todo} });
});

todoRouter.get("/", async (req, res) => {
  // req.body
  //console.log("from todo router", req.body)
 let todos = await todoModel.find({userId:req.body.userId})
  res.json({ msg: { data: todos} });
});



module.exports = todoRouter;
