import React from 'react';
import '../css/AppHeader.css'

import logo from '../assets/logo512.png';
function AppHeader(props) {
    return (
        <>
            <div className="AppHeader">
                <div className='logoContainer'>
                    <img className="logo" src={logo}></img>
                </div>
                <div className="buttonContainer">
                    <button className="spotifyButton">Connect to Spotify</button>
                </div>
                <h1 className='pageTitle'>{props.pageTitle}</h1>
            </div>
            <hr className="divider"/>
        </>
    )
}

export default AppHeader;