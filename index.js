const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.routes");
const routeRouter = require("./routes/route.routes");
const bookingRouter = require("./routes/booking.routes");
const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/routes", routeRouter);
app.use("/bookings", bookingRouter);
app.listen(8080, async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/cappsc");
    console.log("connected to db");
  } catch (err) {
    console.log("failed to connect db");
  }
  console.log("server started");
});
