const asyncHandler = require('express-async-handler')

const Gratitude = require('../models/gratitudeModel')
/*
 ****************************************
 **** get all gratitudes for a user 
*****@route GET /api/goals 
*****@access Private
 ****************************************
 */
const getGratitude = asyncHandler( async (req,res) => {
    const gratitudes = await Gratitude.find()
    res.status(200).json(gratitudes)
})

/*
 ****************************************
 **** set gratitude for a user 
*****@route POST /api/goals 
*****@access Private
 ****************************************
 */
const setGratitude = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add a text field")
    }

    const gratitude = await Gratitude.create({
        text: req.body.text
    })
    res.status(200).json(gratitude)
})

/*
 ****************************************
 **** update gratitude for a user 
*****@route UPDATE /api/goals/:id
*****@access Private
 ****************************************
 */
const updateGratitude = asyncHandler(async (req,res) => {
    const gratitude = await Gratitude.findById(req.params.id)
    if(!gratitude){
        res.status(400)
        throw new Error("gratitude not found")
    }
    const updatedGratitude = await Gratitude.findByIdAndUpdate(req.params.id, 
        req.body,{new:true},)
    res.status(200).json(updatedGratitude)
})

/*
 ****************************************
 **** delete gratitude for a user 
*****@route DELETE /api/goals/:id 
*****@access Private
 ****************************************
 */
const deleteGratitude = asyncHandler(async (req,res) => {
    const gratitude = await Gratitude.findById(req.params.id)
    if(!gratitude){
        res.status(400)
        throw new Error("gratitude not found")
    }

    await gratitude.remove()

    res.status(200).json({id: req.params.id})
})
module.exports = {
    getGratitude,
    setGratitude,
    updateGratitude,
    deleteGratitude
}