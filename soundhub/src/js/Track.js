import React from 'react';
import album from '../assets/album_cover.png'
import '../css/Track.css'

function Track(props) {
    const handleTrackClick = e =>{
        props.handleTrackClick(props.index);
    }

    return (
        <>
            <div className={props.selected ? 'Track selected' : 'Track'} onClick={handleTrackClick}>
                <div className="albumArtContainer" >
                    <img className="albumArt" src={props.art} alt="album art"></img>
                </div>
                <div className="trackTextInfo">
                    <div className="artistSong">
                        <p>{props.artist}</p>
                        <p>{props.title}</p>
                    </div>
                    <p className="length">{props.length}</p>
                </div>
            </div>
            {/* <hr /> */}
        </>)
}

export default Track;

