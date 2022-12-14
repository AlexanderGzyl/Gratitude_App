const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const expressAsyncHandler = require('express-async-handler')
/*
 ****************************************
 **** set new user 
*****@route POST /api/users 
*****@access Public
 ****************************************
 */
const registerUser = expressAsyncHandler( async (req,res) =>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('user already exists')
    }
    // Hash pass
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    // create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error ("Invalid user data")
    }

})
/*
 ****************************************
 **** Authenticate user
*****@route POST /api/users/login 
*****@access Public
 ****************************************
 */
 const loginUser = expressAsyncHandler( async (req,res) =>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error ("Invalid user data")
    }
})
/*
 ****************************************
 **** get user data
*****@route GET /api/users/me
*****@access Public
 ****************************************
 */
const getMe =  expressAsyncHandler( async (req,res) =>{

    res.status(200).json(req.user)
})

// generate jwt
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET, { expiresIn:'30d'})
}
module.exports = {
    registerUser,
    loginUser,
    getMe,

}