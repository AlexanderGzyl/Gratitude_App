const mongoose = require('mongoose')
const gratitudeSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User",
    },
    text: {
        type: String,
        required: [true,'Please add a text value']
    }

},{
    timestamps: true,
})

module.exports = mongoose.model('Gratitude', gratitudeSchema)