// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const bodyParser = require("body-parser");
const logic = require('./logic.js')
const multer = require('./python/multer.js')

app.use(bodyParser.json()); // decode JSON-formatted incoming POST data

var storage = multer.storage
var upload = multer.upload

app.get('/token', async (req, res) => {
    const token = await logic.getToken();
    res.send({ token: token });
});

app.get("/search/:artist/:token", async (req, res) => {
    const token = req.params.token;
    const id = await logic.getArtistId(token, req.params.artist);
    const recs = await logic.getRecs(token, id, {});
    res.send(recs);
})

app.get('/api/nearby/:location/:token', async (req, res) => {
    let location = req.params.location
    let token = req.params.token
    try {
        let locationResp = await logic.getLocationID(location)
        let artistsResp = await logic.getNearbyArtists(locationResp, token)
        let tracksResp = await logic.getTracks(artistsResp, token)
        console.log(tracksResp.events.length)
        res.send(tracksResp)
    }
    catch (error) { console.log(error) }
})

app.post('/face', upload.single('face'), async (req, res) => {
    try {
        console.log('recieved face image')
        const emotion = await logic.processFace(req.file.path);
        console.log('emotion: ', emotion);

        res.send(emotion);
    } catch (err) {
        res.send(400);
    }
});



module.exports = app;
