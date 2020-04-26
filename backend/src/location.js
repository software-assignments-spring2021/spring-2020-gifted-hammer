const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let locationSchema = new mongoose.Schema({
    city: String,
    state: String,
    genres: Array

  })
module.exports = mongoose.model('Locations', locationSchema, 'geoLocations')
