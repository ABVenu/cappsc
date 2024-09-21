const express = require("express");
const userModel = require("../models/user.model");
const bookingModel = require("../models/booking.model");
const routeModel = require("../models/route.models");
const { BSONError } = require("bson");

const bookingRouter = express.Router()

bookingRouter.get("/", async(req,res)=>{
    let data = await bookingModel.find()
    res.json({msg:data})
})

bookingRouter.get("/dates", async(req,res)=>{
    let data = await bookingModel.aggregate([
        {
          $group: {
            _id: "$doj",  // Grouping by 'doj'
            bookingDetails: { $push: "$$ROOT" }  // Collecting all booking documents
          }
        },
        {
          $lookup: {
            from: "routes",               // Collection to join (use the collection name, usually lowercase and pluralized)
            localField: "bookingDetails.route",  // The field in 'bookingModel' that holds the route IDs
            foreignField: "_id",           // The '_id' field in the 'Route' collection to match against
            as: "routeDetails"             // The new field to hold populated 'Route' details
          }
        },
        {
          $project: {
            _id: 1,                  // Include 'doj' as '_id'
            bookingDetails: 1,       // Include booking details
            routeDetails: 1          // Include populated route details
          }
        }
      ]);

      res.json({msg:data})
})

bookingRouter.post("/", async(req,res)=>{
    const {route,user,seatNumber,doj} = req.body;
    // check user
    let userdata = await userModel.findOne({_id:user})
    if(!userdata){
        res.json({msg:"No user found, please register"})
        return
    }
    // check seat availblity 
    let previousBooking = await bookingModel.findOne({route,seatNumber,doj})
    // the below query helps in finding the price
    let routeData = await routeModel.findOne({_id:route})
    if(seatNumber>routeData.maxSeats){
        res.json({msg:"Seat not Available"})
        return
    }
    if(!previousBooking){
        if( userdata.balance <= routeData.price){
            res.json({msg:"Insufficient Balance, Please add money"});
            return 
        }
        userdata.balance = userdata.balance - routeData.price;
        await userdata.save();
        let bookingData = await bookingModel.create(req.body)
        bookingData.status = true;
        await bookingData.save()
        res.json({msg:{status:"Booked", data:bookingData}})
    }else{
        res.json({msg:"Seat not Available"})
    }
}) 

bookingRouter.delete("/:id", async (req,res)=>{
    // user will send only booking iD
    // if DOJ and Cancellation Date Diff is less than 1 day==> Not Allowed  or else it is allowed
    let data = await bookingModel.findById(req.params.id)
    if(!data){
        res.json({msg:"Booking Not Found"})
        return
    }
    let currentDate = new Date()
    // console.log(data.doj)
    // console.log("cd", currentDate)
    // console.log(currentDate-data.doj)
    // console.log("2024-09-23T00:00:00.000Z"-"2024-09-21T16:00:09.654Z")
    let hours = (data.doj - currentDate)/(1000*60*60)
    // console.log(hours)  => working
    if(hours<24){
        res.json({msg:"Cannot Delete before 24 hours"})
    }else{
        let bookingdata = await bookingModel.findByIdAndDelete(req.params.id)
        let userdata = await userModel.findOne({_id:data.user})
        let routeData = await routeModel.findOne({_id:data.route})
        //console.log(data)
        userdata.balance = userdata.balance + (0.5*routeData.price)
        await userdata.save()
        res.json({msg:{info:"Cancellation Sucessfull", updatedBal: userdata.balance}})
    }
})
module.exports = bookingRouter