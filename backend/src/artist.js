let mongoose = require('mongoose')

let artistSchema = new mongoose.Schema({
    name: String,
    count: Number
  })
module.exports = mongoose.model('Artist', artistSchema)
