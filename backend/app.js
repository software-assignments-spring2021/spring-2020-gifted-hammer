// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
// we will put some server logic here later...
// export the express app we created to make it available to other modules
const http = require('http')
const https = require('https');

const bodyParser = require("body-parser");
const recEndPoint = 'https://api.spotify.com/v1/recommendations?';
const searchEndPoint = 'https://api.spotify.com/v1/search?'

app.use(bodyParser.json()); // decode JSON-formatted incoming POST data

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.post("/test", (req, res) => {
    console.log(req.body);
    res.send({ test: 'ok' });
});

app.post("/search", async (req, res) => {
    console.log(req.body);
    const token = req.body.token;
    const id = await getArtistId(token, req.body.artist);
    console.log(id);
    const recs = await getRecs(token, id, {});
    console.log(recs);
    res.send(recs);
})

const getArtistId = (token, name) => {
    return new Promise(resolve => {
        name = name.replace(' ', '%20');
        let search = searchEndPoint + 'q=' + name + '&type=artist&limit=1'
        https.get(search, { headers: { Authorization: 'Bearer ' + token } }, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                    
                    const id = parsedData.artists.items[0].id;
                    resolve(id);

                    return id;
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    })

}

const getRecs = (token, artistId, params) => {
    
    return new Promise(resolve => {

        const seedArtists = 'seed_artists=' + artistId;
        const filters = 
        '&min_popularity=' + params.popularity * 100 + 
        '&min_tempo=' + params.tempo * 200 + 
        '&min_energy=' + params.energy + 
        '&min_danceability=' + params.danceability +
        '&min_vocals=' + params.vocals +
        '&min_liveness=' + params.mood;
        const request = recEndPoint + seedArtists;
        // console.log(request);

        https.get(request, { headers: { Authorization: 'Bearer ' + token } }, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    // console.log(parsedData);
                    resolve(parsedData.tracks)
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    })


}


module.exports = app;
