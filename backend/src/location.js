const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let locationSchema = new mongoose.Schema({
    city: String,
    state: String,
    artists: Array

  })
module.exports = mongoose.model('Locations', locationSchema, 'geoLocations')
