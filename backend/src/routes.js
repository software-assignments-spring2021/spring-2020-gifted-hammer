// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const bodyParser = require("body-parser");
const logic = require('./logic.js')
const multer = require('./python/multer.js')

app.use(bodyParser.json()); // decode JSON-formatted incoming POST data

var storage = multer.storage
var upload = multer.upload
//GET GENERAL TOKEN
app.get('/token', async (req, res) => {
    const token = await logic.getToken();
    res.send(token);
});

//RECCOMENDATIONS
app.post("/search", async (req, res) => {
    const id = await logic.getArtistId(req.body.token, req.body.artist);
    const recomendations = await logic.getRecs(req.body.token, id, req.body.filters);
    res.send(recomendations);
})

//LOCATION BASED TRACKS
app.post('/nearby', async (req, res) => {
    try {
        console.log(req.body.location)
        let locationResp = await logic.getLocationID(req.body.location)
        let artistsResp = await logic.getNearbyArtists(locationResp, req.body.token)
        let tracksResp = await logic.getTracks(artistsResp, req.body.token)
        res.send(tracksResp)
    }
    catch (error) { console.log(error) }
})

//FACIAL RECOGNITION
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

//ANALYTICS
app.post('/monthlyArtist', async (req, res) => {
    //TIME-RAGE/LIMIT SHOULD BE SENT IN REQ?
    const timeRange = "short_term";
    const limit = "3";
    const monthlyArtist = await getMonthlyArtist(req.body.token, timeRange, limit);
    res.send(monthlyArtist);
})

app.post('/monthlyTrack', async (req, res) => {
    const monthlyArtist = await getMonthlyArtist(req.body.token, timeRange, limit);
    res.send(monthlyTrack);
})



module.exports = app;
