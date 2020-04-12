import React from 'react';
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
                        <p className = "title">{props.name}</p>
                        <p className = "artist">{props.artist}</p>
                    </div>
                    <div className ="lengthContainer">
                        <p className="length">{props.duration}</p>
                    </div>
                </div>
            </div>
        </>)
}

export default Track;

