const express = require('express')
const router = express.Router()
const {getGratitude, setGratitude, updateGratitude,deleteGratitude} = require('../controllers/gratitudeController')

// shared routes are combined here
router.route('/').get(getGratitude).post(setGratitude)
router.route('/:id').put(updateGratitude).delete(deleteGratitude)

module.exports = router