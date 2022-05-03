const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async(req, res, next) => {
    let token;
    //console.log({HeaderAuthorization: req.headers.authorization});

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //console.log("Token Found");
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(decoded);
            req.user = await User.findById(decoded.id).select('-password');
            console.log({Usuario: req.user});
        } catch(error){

        }
    } else if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
  
    next();
});

const admin =(req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next();
    } else{
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

module.exports = {protect, admin};