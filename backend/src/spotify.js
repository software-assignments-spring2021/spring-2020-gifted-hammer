const got = require('got');
const config = require('./config.json')
exports.getTrackRecommendations = async (seed, token) => {
    let headers = {
        "content-type": "application/json", "Accept": "application/json", "Authorization": "Bearer " + token
    }
    const baseUrl = "https://api.spotify.com/v1/recommendations?market=US&seed_artists=";
    const songQuery = baseUrl + seed
    let resp = await got(songQuery, { headers: headers });
    result = JSON.parse(resp.body)
    recommendations = result.tracks
    let recArr = []
    for (let rec of recommendations) {
        recArr.push({ 'Track': rec['name'], 'Artist': rec['album']['artists'][0]['name'], 'Album': rec['album']['name'], 'Images': rec['album']['images'], 'Duration_ms': rec['duration_ms'] })
    }
    return JSON.stringify(recArr)
};
exports.getToken = async () => {
    console.log('getting token....')
    let options = {
        'headers': {
            'Authorization': 'Basic MmExZTRiMzBhNzJiNDFmZWI1YzQzMmFlZDk4NzdjY2I6NmFkYWIwMDllNzY4NDE2OWFiYWZiYmRmYjYzYjNiNWQ=',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials'
    }
    let tokenUrl = 'https://accounts.spotify.com/api/token'
    try {
        let resp = await got.post(tokenUrl, options)
        result = JSON.parse(resp.body)
        let token = result['access_token']
        return token
    }
    catch (error) { console.log(error) }
}

exports.getLocationID = async (locationString) => {
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
exports.getArtistURI = async (artist, token) => {
    let artist_string = replaceAll(artist, ' ', '%20')
    let artistQuery = `https://api.spotify.com/v1/search?q=${artist_string}&type=artist`
    let headers = {
        "content-type": "application/json", "Accept": "application/json", "Authorization": "Bearer " + token
    }
    try {
        let resp = await got(artistQuery, { headers: headers });
        result = JSON.parse(resp.body)
        console.log(result)
    }
    catch (error) { console.log(error) }
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
            eventObj = {
                event: {
                    link: event.uri,
                    popularity: event.popularity,
                    status: event.status,
                    date: event.start.date,
                    artist: event.performance[0].artist.displayName
                }
            }
            events.push(eventObj)
        }
        let eventsObj = { events: events }
        return eventsObj
    }
    catch (error) { console.log(error) }
}


