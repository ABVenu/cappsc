const express = require("express")
const conncectToDB = require("./config/connect")
const userRouter = require("./routes/user.routes")
const productRouter = require("./routes/product.routes")
const app = express()
app.use(express.json())


app.use("/user", userRouter)
app.use("/product", productRouter)

app.listen(8080, ()=>{
    conncectToDB()
    console.log("server connected")
})