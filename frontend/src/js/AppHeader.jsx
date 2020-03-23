import React from 'react';
import '../css/AppHeader.css';
import spotify from '../spotify_logo.png';
import logo from '../assets/logo512.png';

function AppHeader(props) {
    return (
        <>
            <div className="AppHeader">
                <div className='logoContainer'>
                    <img className="logo" src={logo}></img>
                    <p> Spotilytics</p>
                </div>
                <div className="buttonContainer">
                    <a className="spotify_container" href="https://www.spotify.com/us/">
                        <img alt="Spotify_logo" src = {spotify}></img>
                        <span className="spotifyButton">Connect to Spotify</span>
                    </a>
                </div>
                <h1 className='pageTitle'>{props.pageTitle}</h1>
            </div>
            {/* <hr className="divider"/> */}
        </>
    )
}
export default AppHeader;