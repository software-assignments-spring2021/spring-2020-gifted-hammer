let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name: String,
    city: String
  })
module.exports = mongoose.model('User', userSchema, 'geoLocations')
