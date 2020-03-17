import React from 'react';
import album from '../album_cover.png'
import '../css/Track.css'

function Track(props) {
    return (
        <div className='Track'>
            <div className="albumArtContainer">
                <img className="albumArt" src={album} alt="album art"></img>
            </div>
            <div className="trackTextInfo">
                <div className="artistSong">
                    <p>{props.artist}</p>
                    <p>{props.title}</p>
                </div>
                <p className="length">{props.length}</p>
            </div>
        </div>)
}

export default Track;

