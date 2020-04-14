// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const http = require('http')
const https = require('https');
const querystring = require('querystring');
var multer = require('multer');
const bodyParser = require("body-parser");
const recEndPoint = 'https://api.spotify.com/v1/recommendations?';
const searchEndPoint = 'https://api.spotify.com/v1/search?'
const monthlyEndPointArtist = 'https://api.spotify.com/v1/me/top/artists?'
const monthlyEndPointTrack = 'https://api.spotify.com/v1/me/top/tracks?'
const trackMoodEndPoint = 'https://api.spotify.com/v1/audio-features/'
const trackFeaturesEndPoint = 'https://api.spotify.com/v1/audio-features?'

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})
var upload = multer({ storage: storage });

app.use(bodyParser.json()); // decode JSON-formatted incoming POST data

app.get('/token', async (req, res) => {
    const token = await getBasicToken();
    res.send({ token: token });
});


// Discovery 

app.post("/search", async (req, res) => {
    const token = req.body.token;
    const id = await getArtistId(token, req.body.artist);
    const recs = await getRecs(token, id, {});
    res.send(recs);
})


// Analytics 

// monthly statistics - artist
app.post('/monthlyArtist', async(req,res) =>{
    const userToken = req.body.token;
    const timeRange = "short_term";
    const limit = "3";
    const monthlyArtist = await getArtist(userToken, timeRange, limit);
    res.send(monthlyArtist);
})

// monthly statistics - artist
app.post('/topGenres', async(req,res) =>{
    const userToken = req.body.token;
    const timeRange = "short_term";
    const limit = "50";
    const allMonthlyArtists = await getArtist(userToken, timeRange, limit);
    const moods = [];
    for(let i = 0; i < allMonthlyArtists.length; i++) {
        let artistGenres = allMonthlyArtists[i].genres;
        for(let j = 0; j < artistGenres.length; j++) {
            let currGenre = artistGenres[j];
            let index = moods.findIndex(k => k.genre === currGenre);
            if(index === -1) {
                moods.push({genre: currGenre, count: 1});
            } else {
                moods[index].count++;
            }
        }
    }
    moods.sort(function(a, b) {return b.count-a.count});
    res.send(moods.slice(0,3));
})

// monthly statistics - track
app.post('/monthlyTrack', async(req,res) =>{
    const userToken = req.body.token;
    const timeRange = "short_term";
    const limit = "3";
    const monthlyTrack = await getTrack(userToken, timeRange, limit);
    res.send(monthlyTrack);
})
// monthly statistics - average mood
app.post('/averageMood', async(req,res) =>{
    const userToken = req.body.token;
    const timeRange = "short_term";
    const limit = "50";
    const allMonthlyTracks = await getTrack(userToken, timeRange, limit);
    const trackIDs = allMonthlyTracks.map(data => data.id);
    // console.log(trackIDs);
    const trackMoods = await Promise.all(trackIDs.map(async (data) => await getTrackMood(data, userToken)));
    res.send(trackMoods);
})

// user statistics - song features
app.post('/songFeatures', async(req,res) =>{
    const userToken = req.body.token;
    const timeRange = "long_term";
    const limit = "50";
    const topTracks = await getTrack(userToken, timeRange, limit);
    const trackIDs = topTracks.map(data => data.id);
    const trackString = trackIDs.toString();
    const trackFeatures = await getTrackFeatures(trackString, userToken);
    res.send(trackFeatures);
})

// Facial Recognition

app.post('/face', upload.single('face'), async (req, res) => {
    try {
        console.log('received face image')
        const emotion = await processFace(req.file.path);
        console.log('emotion: ', emotion);

        res.send(emotion);
    } catch (err) {
        res.send(400);
    }
});

// get token

const getBasicToken = () => {
    return new Promise(resolve => {
        var postData = querystring.stringify({
            'grant_type': 'client_credentials'
        });

        let buf = new Buffer(new Buffer('3a0ca7b16e144325b0d16335076aae72:f7fd31efae414382bf0e053678a16a31'));
        let base64 = buf.toString('base64');
        var options = {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + base64,
                'Content-Type': 'application/x-www-form-urlencoded',

            }
        };

        var tokenReq = https.request('https://accounts.spotify.com/api/token', options, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
                const parsedData = JSON.parse(d);
                resolve(parsedData.access_token);
            });
        });

        tokenReq.on('error', (e) => {
            console.error(e);
        });

        tokenReq.write(postData);
        tokenReq.end();

    })
}


// Discovery


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
            '&min_valence=' + params.mood;
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


// Analytics 


const getArtist = (userToken, timeRange, limit) => {
    return new Promise(resolve => {
        let search = monthlyEndPointArtist + 'time_range=' + timeRange + '&limit=' + limit
        https.get(search,{ headers: {Authorization: 'Bearer ' + userToken}}, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData.items);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    })
}

const getTrack = (userToken, timeRange, limit) => {
    return new Promise(resolve => {
        let search = monthlyEndPointTrack + 'time_range=' + timeRange + '&limit=' + limit
        https.get(search,{ headers: {Authorization: 'Bearer ' + userToken}}, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData.items);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    })
}

const getTrackMood = (trackID, userToken) => {
    return new Promise(resolve => {
        let search = trackMoodEndPoint + trackID
        https.get(search,{ headers: {Authorization: 'Bearer ' + userToken}}, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                    resolve(parsedData.valence);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    })
}

const getTrackFeatures = (trackID, userToken) => {
    return new Promise(resolve => {
        trackID = trackID.replace(/,/g, '%2C');
        let search = trackFeaturesEndPoint + 'ids=' + trackID;
        console.log(search);
        https.get(search,{ headers: {Authorization: 'Bearer ' + userToken}}, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                    resolve(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    })
}

// Facial Recongition (Discovery)

const processFace = (path) => {
    return new Promise(resolve => {
        var spawn = require("child_process").spawn;
        var process = spawn('python', ["./face-analysis.py",
            path]);

        process.stdout.on('data', function (data) {
            console.log(data.toString());
            resolve({ emotion: data.toString().trim() });

        })
    })
}

module.exports = app;