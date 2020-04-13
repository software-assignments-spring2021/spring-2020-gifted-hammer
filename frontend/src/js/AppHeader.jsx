import React from 'react';
import '../css/AppHeader.css';
import spotify from '../spotify_logo.png';
import logo from '../assets/logo.svg';
import * as config from './config'
let http = require('http');

function AppHeader(props) {

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

    return (
        <>
            <div className="AppHeader">
                <div className='logoContainer'>
                    <img className="logo" src={logo} alt="logo"></img>
                    <p> Spotilytics</p>
                </div>
                <div className="buttonContainer">
                    <a className="spotify_container" href={`${config.authEndpoint}client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scopes.join("%20")}&response_type=token&show_dialog=true`}>
                        <img alt="Spotify_logo" src={spotify}></img>
                        <span className="spotifyButton" >Connect to Spotify</span>
                    </a>
                </div>
                <h1 className='pageTitle'>{props.pageTitle}</h1>
            </div>
        </>
    )
}
export default AppHeader;