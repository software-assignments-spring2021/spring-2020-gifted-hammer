const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const got = require('got');
const app = express();
const port = process.env.PORT || 5000;
let spotify = require('./spotify.js')
let middleware = require("./middleware.js")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser());
//check if user has an anon token already, if not generate and give them one!
app.use(middleware.cookieWare)

//this exists to add the speical USER token to the users cookies
app.get('/setUserToken:token', async (req, res) => {
    res.cookie("token", req.params.token);
    res.send(res.cookie);
});

//get reccomendations based off any URI
app.get('/api/getTracks/:uri', async (req, res) => {
    let seed = req.params.uri
    try {
        let recommendations = await spotify.getTrackRecommendations(seed, req.cookies.token)
        res.send(recommendations)
    }
    catch (error) {
        console.log(error)
        res.end()
    }
});

app.get('/api/test/:location', async (req, res) => {
    let location = req.params.location
    try {
        let locationResp = await spotify.getLocationID(location)
        let artistsResp = await spotify.getNearbyArtists(locationResp)
        res.send(artistsResp)
    }
    catch (error) { console.log(error) }
})

app.listen(port, () => console.log(`Listening on port ${port}`));