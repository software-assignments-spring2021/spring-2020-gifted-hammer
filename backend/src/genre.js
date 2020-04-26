let mongoose = require('mongoose')

let genreSchema = new mongoose.Schema({
    name: String,
    count: Number
  })
module.exports = mongoose.model('Genre', genreSchema, 'genres')
