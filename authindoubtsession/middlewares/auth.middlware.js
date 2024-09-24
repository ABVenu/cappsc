var jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    
  try{
     // console.log("headers", req.headers.authorization)
     let token = req.headers.authorization.split(" ")[1]
     /// console.log(token)
      /// logic here???
      // verify the token, check expiry and all
      // if all okay, then say next()
      var decoded = jwt.verify(token, 'shhhhh');
      console.log(decoded)
      if(decoded){
          req.body.userId = decoded.userId;
          /// console.log(req.body)
          next()
      }else{
          res.json({msg:"Please login again..."})
      }
  }catch(err){
    console.log(err)
    res.json({msg:"Something went wrong, please login again"})
  }
    
    
    // or else, return as Unautorized user
    //res.send("hi")

}

module.exports = authMiddleware