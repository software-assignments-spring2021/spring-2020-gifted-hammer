import React from 'react';
import '../css/Analytics.css'
import {
   XAxis, YAxis, Tooltip, Legend, PieChart, Pie, BarChart, Bar, Cell, CartesianGrid
} from 'recharts';
import { useState, useEffect } from 'react';
let Analytics = (props) => {

    const [topSongData, setTopSongData] = useState({})
    const [topGenres, setTopGenres] = useState({})

    const [hasError, setErrors] = useState(false);
    async function fetchData() {
        console.log(props.token);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "token": "BQCD-biLKXEOxjeRr5suOq1Sz-54wloFrfxu4H3VZseB4OEbdmP1oQoe4lNKZsQtQQUQ4IBjHDNAgH3IZbzxmKwplUL3bEPx06x6tr_BGYmB7H3fLl2LUCvnD86P2o_ssqitDFr-6mqwfD2sXxr2zKYrnwiupKLUtTX_vgHIQuZdbzTz_E906Hwn4E5pls2NNqs-VzpxX7C5m1s3hVFdrQ0MmZtAJkC-Stvf65DUTGZS8M-8IqioggZnJVXAgh9y7aUnTzMHFvk"
            })
        };

        // console.log((await fetch('/topSong', requestOptions)).json());
        fetch('/topSong', requestOptions)
        .then(response => response.json())
        .then(data => formatTopSong(data));

        fetch('/topGenres', requestOptions)
        .then(response => response.json())
        .then(data => formatMonthlyGenre(data));
        }

        const formatTopSong = data => {
            console.log(data);
            let topSong = {};
            topSong.name = data[0].name;
            topSong.artist = data[0].artists[0].name;
            topSong.image = data[0].album.images[0].url;
            setTopSongData(topSong);
        }

        
        const formatMonthlyGenre = data => {
            console.log(data);
            let topGenre = {};
            topGenre.firstName = data[0].genre;
            topGenre.firstCount = data[0].count;
            topGenre.firstImage = data[0].image[0];
            topGenre.secondName = data[1].genre;
            topGenre.secondCount = data[1].count;
            topGenre.secondImage = data[1].image[1];
            topGenre.thirdName = data[2].genre;
            topGenre.thirdCount = data[2].count;
            topGenre.thirdImage = data[2].image[2];
            setTopGenres(topGenre);
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
                <SectionHeading name="This Month's Favorite Genres"></SectionHeading>
                <div className='genres'>
                    <Genere name={topGenres.firstName} image ={topGenres.firstImage}></Genere>
                    <Genere name={topGenres.secondName} image ={topGenres.secondImage}></Genere>
                    <Genere name={topGenres.thirdName} image ={topGenres.thirdImage}></Genere>
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
            <img className="genereImg" src={props.image}></img>
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