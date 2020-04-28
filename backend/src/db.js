const mongoose = require('mongoose');
require('dotenv').config()
const server = process.env.DB_HOST
const { check, validationResult } = require('express-validator');

let Locations = require('./location')
let Artist = require('./artist')

// mongoose moodSchema
const moodsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    moods: { type: Array, required: true },
});
mongoose.model("Moods", moodsSchema)
const Moods = mongoose.model("Moods")

// mongoose topSongSchema
const topSongSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    songs: { type: Array, required: true },
});

mongoose.model("TopSong", topSongSchema)
const TopSong = mongoose.model("TopSong")

const TracksSchema = new mongoose.Schema({
    locationCode: { type: String, required: true },
    events: { type: Array, required: true },
});

mongoose.model("Tracks", TracksSchema)
const Tracks = mongoose.model("Tracks")
const connect = () => {
    mongoose.connect(server, { useNewUrlParser: true })
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('connected to database');
      
    });    
}

module.exports.connect = connect

const updateSearch = async (city, state, artist) => {

    city = city.toLowerCase()
    state = state.toLowerCase()
  
    let location = await Locations.findOne({city, state})
    
    if (location) {
        console.log(location);
        
        let found = false
        for (let i = 0; i < location.artists.length; i++) {
            if (location.artists[i].name === artist) {
                console.log('FOUND ARTIST');
                
                location.artists[i].count++   
                console.log(location.artists[i]);   
                found = true
                location.markModified('artists');

                location.save()        
                break;
            }
        }
        if (!found) {
            console.log("No artist founding, adding");
            
            location.artists.push(new Artist({
                name: artist.toLowerCase(),
                count: 1
            }))    
            location.save()        

        }

        
        console.log('updated location');
        
    }
    else {
        console.log('added location');
        
        const newLocation = new Locations({
            city,
            state,
            artists: []
        })
        newLocation.artists.push(new Artist({
            name: artist,
            count: 1
        }))
        newLocation.save()
    }    
}
module.exports.updateSearch = updateSearch

const getTopArtistsInArea = async (city, state) => {
    city = city.toLowerCase()
    state = state.toLowerCase()
    console.log(city, state);
    
    const location = await Locations.findOne({city, state})
    let artists = location.artists;
    artists = artists.sort((a, b) => {
        return a.count > b.count
    })
    const topArtists = []
    for (let i = 0; i < 3; i++) {
        if (i > artists.length - 1)
            topArtists.push("<No Data>")
        else 
            topArtists.push(artists[i].name)
    }
    return topArtists
}

module.exports.getTopArtistsInArea = getTopArtistsInArea