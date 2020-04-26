const mongoose = require('mongoose');
require('dotenv').config()
const server = process.env.DB_HOST

let Locations = require('./location')
let Genre = require('./genre')

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
    let location = await Locations.findOne({city, state})
    
    if (location) {
        console.log(location);
        
        let found = false
        for (let i = 0; i < location.genres.length; i++) {
            if (location.genres[i].name === req.body.artist) {
                location.genres[i].count++        
                console.log(location.genres[i])        
                found = true
                break;
            }
        }
        if (!found) {
            location.genres.push(new Genre({
                name: req.body.artist,
                count: 1
            }))    
        }

        location.save()        
        console.log('updated location');
        
    }
    else {
        console.log('added location');
        
        const newLocation = new Locations({
            city,
            state,
            genres: []
        })
        newLocation.genres.push(new Genre({
            name: req.body.artist,
            count: 1
        }))
        newLocation.save()
    }    
}
module.exports.updateSearch = updateSearch

const getTopArtistsInArea = async (city, state) => {
    city = city.toLowerCase()
    state = state.toLowerCase()
    
    const location = await Locations.findOne({city, state})
    let artists = location.genres;
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