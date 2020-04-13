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

app.post("/search", async (req, res) => {
    const token = req.body.token;
    const id = await getArtistId(token, req.body.artist);
    const recs = await getRecs(token, id, {});
    res.send(recs);
})

app.post('/face', upload.single('face'), async (req, res) => {
    try {
        console.log('recieved face image')
        const emotion = await processFace(req.file.path);
        console.log('emotion: ', emotion);
        
        res.send(emotion);
    } catch (err) {
        res.send(400);
    }
});

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
