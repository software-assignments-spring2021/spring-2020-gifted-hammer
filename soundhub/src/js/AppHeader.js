import React from 'react';
import '../css/AppHeader.css'

import logo from '../logo512.png';
// import logo from '../logo.svg'
let AppHeader = (props) =>
{
    return (
        <div className="AppHeader">
            <div className='logoContainer'>
                <img className="logo" src={logo}></img>
            </div>
            <div className="buttonContainer">
                <button className="spotifyButton">Connect to Spotify</button>
            </div>
            <h1 className='pageTitle'>{props.pageTitle}</h1>
        </div>
    )
}

export default AppHeader;