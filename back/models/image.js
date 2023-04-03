const mongoose = require('mongoose')


const imageSchema = new mongoose.Schema({
 data: String,
})


module.exports = mongoose.model("Image", imageSchema)