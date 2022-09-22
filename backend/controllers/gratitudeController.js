const asyncHandler = require('express-async-handler')
/*
 ****************************************
 **** get all gratitudes for a user 
*****@route GET /api/goals 
*****@access Private
 ****************************************
 */
const getGratitude = asyncHandler( async (req,res) => {
    res.status(200).json({message:'get gratitudes'})
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
    res.status(200).json({message:'set gratitude'})
})

/*
 ****************************************
 **** update gratitude for a user 
*****@route UPDATE /api/goals/:id
*****@access Private
 ****************************************
 */
const updateGratitude = asyncHandler(async (req,res) => {
    res.status(200).json({message:`update gratitude ${req.params.id}`})
})

/*
 ****************************************
 **** delete gratitude for a user 
*****@route DELETE /api/goals/:id 
*****@access Private
 ****************************************
 */
const deleteGratitude = asyncHandler(async (req,res) => {
    res.status(200).json({message:`delete gratitude ${req.params.id}`})
})
module.exports = {
    getGratitude,
    setGratitude,
    updateGratitude,
    deleteGratitude
}