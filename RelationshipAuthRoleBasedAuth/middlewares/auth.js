var jwt = require('jsonwebtoken');

const authMidleware = (req,res,next)=>{
    /// token from req that too from the header

   let token = req.headers.authorization.split(" ")[1]
    /// we need to verify the token
    //console.log(token)
    var decoded = jwt.verify(token, 'shhhhh');
   // var decoded = false
    if(decoded){
        /// i will get the data encoded in the token
        req.userId = decoded.userid;
        req.role = decoded.role;
        //console.log("auth", req.userId, req.role)
        next()
    }else{
        res.json({msg:"Unauthorized from Auth Middleware"})
    }
}

module.exports = authMidleware;
