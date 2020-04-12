const axios = require('axios');
let FormData = require('form-data');
var got = require('got');
exports.getTrackRecommendations = async (seed, token) => {
    let headers = {
        "content-type": "application/json", "Accept": "application/json", "Authorization": "Bearer " + token
    }
    const baseUrl = "https://api.spotify.com/v1/recommendations?market=US&seed_artists=";
    const songQuery = baseUrl + seed
    let resp = await got(songQuery, { headers: headers });
    result = JSON.parse(resp.body)
    recommendations = result.tracks
    console.log(recommendations)
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
