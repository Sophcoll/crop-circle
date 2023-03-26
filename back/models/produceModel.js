const mongoose = require('mongoose')

const Schema = mongoose.Schema
const produceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exchange: {
        type: String,
        required: true
    },
    image: {
    data: Buffer,
    contentType: String,
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

module.exports = mongoose.model('Produce', produceSchema)