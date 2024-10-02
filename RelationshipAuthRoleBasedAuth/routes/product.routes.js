const express = require("express");
const productModel = require("../models/products.model");
const authMidleware = require("../middlewares/auth");
const roleBasedAuth = require("../middlewares/role.auth");
const cartModel = require("../models/cart.model");



const productRouter = express.Router();


productRouter.get("/", async(req,res)=>{
    let data = await productModel.find()
    res.json({msg:data})
})

productRouter.post("/",authMidleware,roleBasedAuth(["seller","admin"]) ,async(req,res)=>{
   // console.log(req.userId)
   // console.log({...req.body, sellerId: req.userId})
    let data = await productModel.create({...req.body, sellerId: req.userId})
    res.json({msg:data})
})


////cart routes

productRouter.post("/cart/:id",authMidleware,roleBasedAuth(["buyer","admin"]) ,async(req,res)=>{
   /// body ==> producId
   /// backend ==?? buyerId
   /// req.body.buyerId = req.userId  
   /// if user's cart is present then push the product into cart array 
   // else create a cart and push
   let cart = await cartModel.findOne({buyerId:req.userId});
   if(cart){
    /// need to push product id in the array
    if(cart.products.includes(req.params.id)){
        res.json({msg:"Product already present in the cart"})
        return
    }
     let product = await productModel.findOne({_id:req.params.id})
     cart.products.push(req.params.id);
     cart.totalValue = cart.totalValue+product.price
     cart.save()
     res.json({msg:cart})
   }else{
    /// create a new cart and push it
    let data = await cartModel.create({buyerId:req.userId});
    data.products.push(req.params.id);
    let product = await productModel.findOne({_id:req.params.id})
    data.totalValue = product.price
    data.save()
    res.json({msg:data})
   }
 })


 productRouter.delete("/cart/:id",authMidleware,roleBasedAuth(["buyer","admin"]) ,async(req,res)=>{
    /// body ==> producId
    /// backend ==?? buyerId
    /// req.body.buyerId = req.userId  
    /// if user's cart is present then push the product into cart array 
    // else create a cart and push
    let cart = await cartModel.findOne({buyerId:req.userId});
    if(cart){
     /// need to push product id in the array
      let data = await cartModel.findOneAndUpdate({buyerId:req.userId}, {$pull:{products:req.params.id}})
      let product = await productModel.findOne({_id:req.params.id})
      cart.totalValue = cart.totalValue - product.price;
      cart.save()
      res.json({msg:"Product Removed"})
    }else{
     res.json({msg:"No Cart Found"})
    }
  })

module.exports = productRouter;
