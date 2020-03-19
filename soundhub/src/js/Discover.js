import React, { useState } from 'react';
import '../css/Discover.css';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Filters from './Filters';
import Track from './Track';
import Input from "./Input";
let http = require('http');

const numTracks = 20;

function Discover(props) {
    const [userSearched, setUserSearched] = useState(false);
    const [textValue, setTextValue] = useState('Search Artist or Track');
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(-1);

    const handleSubmit = e => {
        e.preventDefault();
        setUserSearched(true);
        http.get('https://my.api.mockaroo.com/spotify.json?key=997893d0', res => {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    processData(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        })
    }

    const processData = data => {
        let newTracks = []
        for (let i = 0; i < data.length; i++) {
            newTracks.push(data[i]);
        }
        setTracks(newTracks);
        console.log(newTracks[0].art);
        
    }

    const handleChange = e => {
        setTextValue(e.target.value)
    }

    const handleTrackClick = trackNum => {
        if (trackNum == selectedTrack)
            setSelectedTrack(-1);
        else
            setSelectedTrack(trackNum);
    }

    const createTracks = () => {
        return (<div className='tracks'>
            {
                tracks.map((track, index) => (
                    <Track key={index} index={index} selected={(index == selectedTrack) ? true : false} handleTrackClick={handleTrackClick} artist={track.artist} title={track.title} length={track.length} art={track.art} />
                ))
            }

        </div>);
    }

    return (
        <div className='Discover'>
            <div className="discoverBody">
                <form className="searchForm" onSubmit={handleSubmit}>
                    <Input
                        inputType={"text"}
                        title={"Find new Music:"}
                        placeholder={"Enter Song Name or Track Name"}
                        handleChange={handleChange}
                    />
                </form>

                <Filters />
                {userSearched ? createTracks() : null}

            </div>
        </div>
    )
}

export default Discover;