const https = require('https');
const config = require('./config.json')
const got = require('got')
const db = require('./db');
const mongoose = require('mongoose');
const Tracks = mongoose.model('Tracks');
const Moods = mongoose.model('Moods');
const TopSong = mongoose.model('TopSong');

exports.getToken = async () => {
    console.log('getting token....')
    let options = config.spotify.tokenOptions
    let tokenUrl = config.spotify.tokenURL
    try {
        let resp = await got.post(tokenUrl, options)
        result = JSON.parse(resp.body)
        let token = result['access_token']
        return { token: token }
    }
    catch (error) { console.log(error) }
}

exports.getArtistId = (token, name) => {
    return new Promise(resolve => {
        name = replaceAll(name, ' ', '%20')
        let search = config.spotify.searchEndPoint + 'q=' + name + '&type=artist&limit=1'
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

exports.getUserId = (token) => {
    return new Promise(resolve => {
        let search = config.spotify.userIdEnpoint
        https.get(search, {headers : { Authorization: 'Bearer ' + token } }, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try{
                    const parsedData = JSON.parse(rawData);
                    const id = parsedData.id;
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

exports.getRecs = (token, artistId, params) => {

    return new Promise(resolve => {

        const seedArtists = 'seed_artists=' + artistId;
        const filters =
            '&min_popularity=' + params.popularity * 100 +
            '&min_tempo=' + params.tempo * 200 +
            '&min_energy=' + params.energy +
            '&min_danceability=' + params.danceability +
            '&min_vocals=' + params.vocals +
            '&min_valence=' + params.mood;
        const request = config.spotify.recEndPoint + seedArtists;
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

exports.processFace = (path) => {
    return new Promise(resolve => {
        var spawn = require("child_process").spawn;
        var process = spawn('python', ["./python/face-analysis.py",
            path]);
        process.stdout.on('data', function (data) {
            console.log(data.toString());
            resolve({ emotion: data.toString().trim() });

        })

        process.stderr.on('data', (data) => {
            // As said before, convert the Uint8Array to a readable string.
            console.log(new TextDecoder("utf-8").decode(data));
        });

    })
}
exports.getLocationID = async (locationString) => {
    locationString = replaceAll(locationString, " ", "_")
    locationIDQuery = `https://api.songkick.com/api/3.0/search/locations.json?query=${locationString}&apikey=${config.songKick.apiKey}`
    let locationObj = {}
    try {
        let resp = await got(locationIDQuery)
        result = JSON.parse(resp.body)
        if (result.resultsPage.results.location) {
            let id = result.resultsPage.results.location[0].metroArea.id
            let locationName = result.resultsPage.results.location[0].metroArea.displayName
            let locationState = result.resultsPage.results.location[0].metroArea.state.displayName
            locationObj = { name: locationName, state: locationState, id: id }
            return JSON.stringify(locationObj)
        }
        else { return locationObj }
    }
    catch (error) { console.log(error) }
}
exports.getArtistInfo = async (artist, token) => {
    let artist_string = replaceAll(artist, ' ', '%20')
    let artistQuery = `https://api.spotify.com/v1/search?q=${artist_string}&type=artist`
    let artistObj = {}
    let headers = {
        "content-type": "application/json", "Accept": "application/json", "Authorization": "Bearer " + token
    }
    try {
        let resp = await got(artistQuery, { headers: headers });
        result = JSON.parse(resp.body)
        if (result.artists.items) {

            if (result.artists.items[0]) {
                artistObj = {
                    name: result.artists.items[0].name,
                    id: result.artists.items[0].id,
                    genres: result.artists.items[0].genres,
                    popularity: result.artists.items[0].popularity
                }
                return artistObj
            }
        }
    }
    catch (error) {
        console.log(error)
        return artistObj
    }
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

exports.getNearbyArtists = async (locationObj, token) => {
    locationObj = JSON.parse(locationObj)
    let eventQuery = `https://api.songkick.com/api/3.0/metro_areas/${locationObj.id}/calendar.json?apikey=${config.songKick.apiKey}`
    try {
        let resp = await got(eventQuery)
        result = JSON.parse(resp.body)
        let rawEvents = result.resultsPage.results.event
        let events = []
        for (let event of rawEvents) {
            if (event.performance[0]) {
                artistObj = await this.getArtistInfo(event.performance[0].artist.displayName, token)
                if (artistObj) {
                    eventObj = {
                        event: {
                            link: event.uri,
                            popularity: event.popularity,
                            status: event.status,
                            date: event.start.date,
                            artist: event.performance[0].artist.displayName
                        },
                        artist: artistObj
                    }
                    events.push(eventObj)
                }
            }

        }
        let eventsObj = { events: events }
        return eventsObj
    }
    catch (error) { console.log(error) }
}

exports.getTracks = async (artistObj, token) => {
    let headers = {
        "content-type": "application/json", "Accept": "application/json", "Authorization": "Bearer " + token
    }
    let completeObject = artistObj
    for (let obj of artistObj.events) {
        //DONT HAVE UNDEFINED ARTISTS!!
        if (obj.artist) {
            let trackQuery = `https://api.spotify.com/v1/artists/${obj.artist.id}/top-tracks?country=US`
            try {
                let resp = await got(trackQuery, { headers: headers })
                let result = JSON.parse(resp.body)
                let tracks = []
                for (let track of result.tracks) {
                    let trackObj = { name: track['name'], artist: track['album']['artists'][0]['name'], album: track['album']['name'], art: track['album']['images'][0]['url'], duration: track['duration_ms'], popularity: track['popularity'], audio: ['preview_url'] }
                    tracks.push(trackObj)
                }
                obj['tracks'] = tracks
            }
            catch (error) { console.log(error) }
        }
    }
    return artistObj

}


exports.getMonthlyArtist = (userToken, timeRange, limit) => {
    return new Promise(resolve => {
        let search = monthlyEndPointArtist + 'time_range=' + timeRange + '&limit=' + limit
        https.get(request, { headers: { Authorization: 'Bearer ' + userToken } }, res => {
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

exports.getMonthlyTrack = (userToken) => {
    return new Promise(resolve => {
        let search = monthlyEndPointTrack + 'time_range=' + timeRange + '&limit=' + limit
        https.get(request, { headers: { Authorization: 'Bearer ' + userToken } }, res => {
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

//ANALYTICS

exports.getArtist = (userToken, timeRange, limit) => {
    return new Promise(resolve => {
        let search = config.spotify.monthlyEndPointArtist + 'time_range=' + timeRange + '&limit=' + limit
        https.get(search, { headers: { Authorization: 'Bearer ' + userToken } }, res => {
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

exports.getTrack = (userToken, timeRange, limit) => {
    return new Promise(resolve => {
        let search = config.spotify.monthlyEndPointTrack + 'time_range=' + timeRange + '&limit=' + limit
        https.get(search, { headers: { Authorization: 'Bearer ' + userToken } }, res => {
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

exports.getTrackMood = (trackID, userToken) => {
    return new Promise(resolve => {
        let search = config.spotify.trackMoodEndPoint + trackID
        https.get(search, { headers: { Authorization: 'Bearer ' + userToken } }, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    // console.log(parsedData);
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


exports.getRecentlyPlayed = async (userToken, limit) => {
    return new Promise(resolve => {
        let search = config.spotify.recentlyPlayedEndPoint + '&limit=' + limit
        https.get(search, { headers: { Authorization: 'Bearer ' + userToken } }, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log(parsedData)
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

exports.getTrackAverageMood = (trackID, userToken) => {
    return new Promise(resolve => {
        trackID = trackID.replace(/,/g, '%2C');
        let search = config.spotify.trackFeaturesEndPoint + 'ids=' + trackID;
        // console.log(search);
        https.get(search, { headers: { Authorization: 'Bearer ' + userToken } }, res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    let moodSum = 0;
                    let count = 0;
                    const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                    for(let i =0; i<parsedData.audio_features.length; i++){
                        moodSum += parsedData.audio_features[i].valence;
                        count++;
                    }
                    let averageMood = moodSum/count;
                    resolve(averageMood);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    })
}




//DATABASE 
// Discovery - Location
exports.uploadTracks = (locationCode, events) => {
    const tracks = new Tracks({ locationCode: locationCode, events: events })
    let res = tracks.save()
    return res
}
exports.findTracks = async (locationCode) => {
    let res = await Tracks.find({ "locationCode": locationCode })
    return res[0]
}

// Analytics - Mood
exports.updateMoods = async (userId, moodInput) => {
    let res = await this.findMoods(userId)
    console.log(res)
    if (!res[0]){
        const moods = new Moods({ userId: userId, moods: moodInput})
        let res2 = await moods.save()
        console.log("new mood was saved " + res2)
        return res2
    }else{
        let pastMoods = res[0]["moods"]
        pastMoods.push(moodInput)
        console.log(pastMoods)
        let update = await Moods.findOneAndUpdate( { userId: userId } , {moods: pastMoods}, {new: true})
        return update
    }

}

exports.findMoods = async (userId) => {
    let res = await Moods.find({ "userId": userId })
    return res
}

// Analytics - Top Song
exports.uploadTopSong = async (userId, topSongInput) => {
    let res = await this.findTopSong(userId)
    if(!res) {
        const topSong = new TopSong({userId: userId, songs: topSongInput})
        let res2 = await topSong.save();
        console.log("top song saved " + res2)
        return res2
    } else {
        return res;
    }
}

exports.findTopSong = async (userId) => {
    let res = await TopSong.find({ "userId": userId })
    return res[0]
}