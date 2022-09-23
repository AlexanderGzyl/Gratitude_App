const jwt = require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = expressAsyncHandler(async (req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try{
            // get token from header
            token = req.headers.authorization.split(' ')[1]
            // verify
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            // get user ID from the token
            // assign in order to access it in any route that is protected
            req.user = await User.findById(decoded.id).select('-password')
            // call next piece of middleware
            next()
        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error("not authorized")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("not authorized, no token")
    }

})

module.exports = {protect}