const roleBasedAuth = (role)=>{

    /// role is the array of users
   return (req,res,next)=>{
      if(role.includes(req.role)){
        next()
      }else{
        res.json({msg:"Unauthorized"})
      }
   }
}

module.exports = roleBasedAuth;

// productRouter.post("/",authMidleware,roleBasedAuth(["seller","admin"]) ,async(req,res)=>{
//     let data = await productMode.create(req.body)
//     res.json({msg:data})
// })