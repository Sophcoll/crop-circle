const mongoose = require('mongoose')

const Schema = mongoose.Schema

// image: {
//     data: Buffer,
//     contentType: String,
//     },

const listingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exchange: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    pickup: {
      type: String,  
    },
    description: {
        type: String
    },
    message: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Listing', listingSchema)