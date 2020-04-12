const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const got = require('got');
const app = express();
const port = process.env.PORT || 5000;
let spotify = require('./spotify.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser());


app.get('/setUserToken:token', async (req, res) => {
    res.cookie("token", req.params.token);
    res.send(res.cookie);
});

app.get('/api/getTracks/:uri', async (req, res) => {
    let seed = req.params.uri
    //Fetch Anon Auth Token if not already in cookies
    if (!req.cookies.token) {
        try {
            let token = await spotify.getToken()
            res.cookie("token", token, { expire: 3600000 + Date.now() });
        }
        catch (error) {
            console.log(error)
            res.end()
        }
    }
    //Get the track recomendations 
    try {
        let recommendations = await spotify.getTrackRecommendations(seed, req.cookies.token)
        res.send(recommendations)
    }
    catch (error) {
        console.log(error)
        res.end()
    }


});

app.listen(port, () => console.log(`Listening on port ${port}`));