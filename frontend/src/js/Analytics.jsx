import React from 'react';
import '../css/Analytics.css'
import {
   XAxis, YAxis, Tooltip, Legend, PieChart, Pie, BarChart, Bar, Cell, CartesianGrid
} from 'recharts';
import { useState, useEffect } from 'react';
let Analytics = (props) => {

    const [topSongData, setTopSongData] = useState({})
    const [hasError, setErrors] = useState(false);
    async function fetchData() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "token": "BQCNYqv_O0w8OdyjycMy3_LDHhX4DMN_8z1oxeDUAjpnn3kTBwIduaWkQnFBItFVKCqAjrEZlmegVM0TBmz_W08WDWHKasheq2_C2DM7P9uoY4Agyu1vsrqWhjkt_Y3rqSch1gIJEoOuMOm_dQ9kC5FxkwbMOaoD3FcGNdrHpCcDbvAPtWAdU7YFiqRvxbYq046x7zwjsuKqBIOjUhVabal5p4SyrWBd92043qsf6LVWLWpEU5cieFzTE0IMlCmU8mJWq2wCoVI"
            })
        };

        // console.log((await fetch('/topSong', requestOptions)).json());
        fetch('/topSong', requestOptions)
        .then(response => response.json())
        .then(data => formatTopSong(data));
        }

        const formatTopSong = data => {
            console.log(data);
            let topSong = {};
            topSong.name = data[0].name;
            topSong.artist = data[0].artists[0].name;
            topSong.image = data[0].album.images[0].url;
            // topSong.
            setTopSongData(topSong);
        }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="analytics">
            {/* <div className='section'>
                <SectionHeading name="This month you listened to..."></SectionHeading>
                <div className='overview'>
                    <div className="overviewOne">
                        <BigMetric value='1005' descriptor="Minutes of music"></BigMetric>
                    </div>
                    <div className="overviewTwo">
                        <Metric value="17" descriptor="Albums"></Metric>
                        <Metric value="200" descriptor="Artists"></Metric>
                        <Metric value="400" descriptor="Songs"></Metric>
                    </div>
                </div>
            </div> */}
            <div className='section'>
                <SectionHeading name="This Month's Favorites"></SectionHeading>
                <div className='genres'>
                    <Genere name="Rock"></Genere>
                    <Genere name="Pop"></Genere>
                    <Genere name="Metal"></Genere>
                </div>
            </div>
            <div className='section'>
                <SectionHeading name='Top song'></SectionHeading>
                <div className='topSong'>
                    <div className="topSongOne">
                        <Metric value={topSongData.name} descriptor={topSongData.artist}></Metric>
                        {/* <p>You listened 500 times!</p> */}
                    </div>
                    <img className="topImg" src={topSongData.image} alt="album art"></img>
                </div>
            </div>
            <div className='section'>
                <SectionHeading name='Average track mood'></SectionHeading>
                <div className='moodChart'>
                    <MoodChart></MoodChart>
                </div>
            </div>
            <div className='section'>
                <SectionHeading name='Your genere breakdown'></SectionHeading>
                <div className='sectionBody genereChart'>
                    <GenereChart></GenereChart>
                </div>
            </div>
        </div>
    )
}
let SectionHeading = (props) => {
    return (
        <div>
            <h2 className="sectionTitle">{props.name}</h2>
        </div>
    )
}
let Metric = (props) => {
    return (
        <div className="bigMetric">
            <h3>{props.value}</h3>
            <h4>{props.descriptor}</h4>
        </div>
    )
}

let BigMetric = (props) => {
    return (
        <div className="bigMetric">
            <h2>{props.value}</h2>
            <h3>{props.descriptor}</h3>
        </div>
    )
}
let Genere = (props) => {
    return (
        <div className="genere">
            <h4>{props.name}</h4>
            <div className="genereImg"></div>
        </div>
    )
}
let MoodChart = (props) => {
    const data = [
        {
            name: 'song1', avgMoodScore: 25,
        },
        {
            name: 'song2', avgMoodScore: 91,
        },
        {
            name: 'song', avgMoodScore: 70,
        },
        {
            name: 'song4', avgMoodScore: 27,
        },
        {
            name: 'song5', avgMoodScore: 33,
        },
        {
            name: 'song6', avgMoodScore: 65,
        },
        {
            name: 'song7', avgMoodScore: 91,
        },
        {
            name: 'song8', avgMoodScore: 92,
        },
        {
            name: 'song9', avgMoodScore: 73,
        },
        {
            name: 'song10', avgMoodScore: 24,
        },
        {
            name: 'song11', avgMoodScore: 31,
        },
        {
            name: 'song12', avgMoodScore: 25,
        },
        {
            name: 'song13', avgMoodScore: 30,
        },
        {
            name: 'song14', avgMoodScore: 41,
        },
        {
            name: 'song15', avgMoodScore: 21,
        },
        {
            name: 'song16', avgMoodScore: 47,
        },
        {
            name: 'song17', avgMoodScore: 12,
        },
        {
            name: 'song18', avgMoodScore: 15,
        },
        {
            name: 'song18', avgMoodScore: 90,
        },
        {
            name: 'song20', avgMoodScore: 81,
        },
        {
            name: 'song21', avgMoodScore: 77,
        },
        {
            name: 'song22', avgMoodScore: 27,
        },
        {
            name: 'song23', avgMoodScore: 37,
        },
        {
            name: 'song24', avgMoodScore: 35,
        },
        {
            name: 'song25', avgMoodScore: 60,
        }
    ];

    return (
        <BarChart
            width={700}
            height={200}
            data={data}
            margin={{
                top: 10, right: 10, left: 0, bottom: 5,
            }}
        >
        <XAxis dataKey="name" tick={false}/>
        <YAxis />
        <Tooltip/>
        <Bar dataKey="avgMoodScore" fill="#8884d8" />
        </BarChart>
    )
}
let GenereChart = (props) => {
    const data01 = [
        { name: 'Rock', value: 25 }, { name: 'Metal', value: 30 },
        { name: 'Pop', value: 35 }, { name: 'Lo-Fi', value: 10 }
    ];


    return (
        <PieChart width={800} height={400}
            margin={{
                top: 0, right: 40, left: 20, bottom: 0,
            }}>
            <Pie dataKey='value' data={data01} cx={400} cy={200} innerRadius={40} outerRadius={80} fill="#8884d8" />
            <Tooltip />
        </PieChart>
    )

}

export default Analytics