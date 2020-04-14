import React, { useState } from 'react';
import '../../css/Discover.css';
import Filters from './Filters';
import Track from './Track';
import Input from "./Input";
import SearchType from "./SearchType";
// const filterNames = ['popularity', 'tempo', 'energy', 'danceable', 'vocals', 'mood'];

function Discover(props) {
    const [userSearched, setUserSearched] = useState(false);
    const [textValue, setTextValue] = useState('Search Artist or Track');
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(-1);
    const [audioPlayer] = useState(new Audio());
    const [type, setType] = useState('recommend')
    const [title, setTitle] = useState('Enter Song Name or Track Name')

    const [parameterValues, setParameterValues] = useState({
        popularity: 0,
        tempo: 0,
        energy: 0,
        danceable: 0,
        vocals: 0,
        mood: 0
    });

    const millisToMinutesAndSeconds = millis => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }


    const handleSubmit = e => {
        e.preventDefault();
        setUserSearched(true);
        if (type !== 'location') { getRecTracks() }
        else (getLocTracks())
    }

    const getLocTracks = () => {
        const token = props.token;
        let data = {
            token: token,
            location: textValue,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch('/nearby', requestOptions)
            .then(response => response.json())
            .then(data => processData(data));
    }

    const getRecTracks = () => {
        const token = props.token;
        let data = {
            token: token,
            artist: textValue,
            filters: parameterValues
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch('/search', requestOptions)
            .then(response => response.json())
            .then(data => processData(data));
    }

    const processData = data => {
        console.log(data);

        let newTracks = []
        if (type !== 'location') {
            for (let i = 0; i < data.length; i++) {
                let newTrack = {};
                newTrack.artist = data[i].artists[0].name;
                newTrack.name = data[i].name;
                newTrack.duration = millisToMinutesAndSeconds(data[i].duration_ms);
                newTrack.art = data[i].album.images[0].url;
                newTrack.audio = data[i].preview_url;

                newTracks.push(newTrack);
            }
            console.log(newTracks);
            setTracks(newTracks);
        }
        else {
            for (let obj of data.events) {
                if (obj.tracks) {
                    obj.tracks[0].duration = millisToMinutesAndSeconds(obj.tracks[0].duration)
                    newTracks.push(obj.tracks[0])
                }
            }
            setTracks(newTracks)
        }

    }
    const handleChange = e => {
        setTextValue(e.target.value)
    }
    const handleTrackClick = trackNum => {
        if (trackNum === selectedTrack) {
            audioPlayer.pause();
            setSelectedTrack(-1);
        }
        else {
            const newSource = tracks[trackNum].audio;
            if (newSource === null)
                audioPlayer.pause();
            else {
                audioPlayer.src = newSource
                audioPlayer.play()
            }

            setSelectedTrack(trackNum);
        }
    }

    const sliderValueChanged = e => {
        setParameterValues({ ...parameterValues, [e.target.id]: e.target.value });
        getRecTracks();
    }

    const setText = () => {

    }


    const createTracks = () => {

        return (<div className='tracks'>
            {
                tracks.map((track, index) => (
                    <Track
                        key={index}
                        index={index}
                        selected={(index === selectedTrack) ? true : false}
                        handleTrackClick={handleTrackClick}
                        artist={track.artist}
                        name={track.name}
                        duration={track.duration}
                        art={track.art}
                        audio={track.audio} />
                ))
            }
        </div>);
    }

    const searchSwitch = () => {
        let curState = type
        if (curState == 'location') { setType('recommend') }
        else { setType('location') }
        console.log(type)
    }

    return (
        <div className='Discover'>
            <div className="discoverBody">
                <form className="searchForm" onSubmit={handleSubmit}>
                    <SearchType
                        handleChange={searchSwitch}
                    />
                    <Input
                        inputType={"text"}
                        title={"Find new Music:"}
                        placeholder={type == 'location' ? 'Enter City Name' : 'Enter Song Name or Track Name'}
                        handleChange={handleChange}
                    />
                </form>

                <Filters sliderValueChanged={sliderValueChanged} />
                {userSearched ? createTracks() : null}

            </div>
        </div>
    )
}

export default Discover;