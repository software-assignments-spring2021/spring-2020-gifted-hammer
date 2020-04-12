import React, { useState, useEffect } from 'react';

let SpotifyBttn = (props) => {
    const [artists, setArtists] = useState('')
    useEffect(() => {
        let token = window.location.hash.substr(1).split('&')[0].split("=")[1]
        if (token) {
            //console.log(token)
            window.opener.spotifyCallback(token)
        }
    }, []);

    let login = () => {
        let client_id = '2a1e4b30a72b41feb5c432aed9877ccb'
        let redirect_uri = 'http%3A%2F%2Flocalhost%3A3000'
        let scopes = 'user-top-read'
        let popup = window.open(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')
        window.spotifyCallback = (payload) => {
            //alert(payload)
            popup.close()
            fetch('https://api.spotify.com/v1/me/top/artists', {
                headers: {
                    'Authorization': `Bearer ${payload}`
                }
            }).then(response => {
                return response.json()
            }).then(data => {
                //output data
                console.log(data)
                setArtists(data)
            })
        }
    }
    return (
        <button className='spotifyBttn' onClick={login}>connect to spotify</button>
    )
}
export default SpotifyBttn;