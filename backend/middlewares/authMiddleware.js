 const jwt =require("jsonwebtoken")
 const User=require("../models/user.js")
 

 const protect=async(req,res,next)=>{
try{
    let token=req.headers.authorization
    if(token && token.startsWith("Bearer")){
        token=token.split(" ")[1]  //extracting token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=await User.findById(decoded.id).select("-password")
        next()
    }
    else{
        res.status(401).json({message:"NOT AUTHORIZED"})
    }
}
catch(error){
    res.status(401).json({message:"Token failed",error:error.message})
}
 }

 module.exports={protect}