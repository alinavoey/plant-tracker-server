const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
    species: {
        type: String,
        required: true
    },
    lightLevel: {
        type: String,
        required: true
    }, 
    lastWaterDate: {
        type: Date,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Plant', plantSchema)