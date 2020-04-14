import React from 'react';
import '../css/Analytics.css'
import {
   XAxis, YAxis, Tooltip, Legend, PieChart, Pie, BarChart, Bar, Cell, CartesianGrid
} from 'recharts';
import { useState, useEffect } from 'react';
let Analytics = (props) => {

    const [topSongData, setTopSongData] = useState({})
    const [topGenres, setTopGenres] = useState({})
    const [genreBreakdown, setGenreBreakdown] = useState([])
    const [trackMoods, setTrackMoods] = useState([])
    const accessToken = props.accessToken

    const [hasError, setErrors] = useState(false);
    async function fetchData() {
        console.log(accessToken);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "token": accessToken
            })
        };

        // console.log((await fetch('/topSong', requestOptions)).json());
        fetch('/topSong', requestOptions)
        .then(response => response.json())
        .then(data => formatTopSong(data));

        fetch('/topGenres', requestOptions)
        .then(response => response.json())
        .then(data => formatMonthlyGenre(data));

        fetch('/genreBreakdown', requestOptions)
        .then(response => response.json())
        .then(data => setGenreBreakdown(data));

        fetch('/trackMoods', requestOptions)
        .then(response => response.json())
        .then(data => setTrackMoods(data));
        }


        const formatTopSong = data => {
            let topSong = {};
            topSong.name = data[0].name;
            topSong.artist = data[0].artists[0].name;
            topSong.image = data[0].album.images[0].url;
            setTopSongData(topSong);
        }

        
        const formatMonthlyGenre = data => {
            let topGenre = {};
            topGenre.firstName = data[0].genre;
            const random1 = Math.floor((Math.random() * data[0].image.length-1) + 1);
            topGenre.firstImage = data[0].image[random1];
            topGenre.secondName = data[1].genre;
            const random2 = Math.floor((Math.random() * data[1].image.length-1) + 1);
            topGenre.secondImage = data[1].image[random2];
            topGenre.thirdName = data[2].genre;
            const random3 = Math.floor((Math.random() * data[2].image.length-1) + 1);
            topGenre.thirdImage = data[2].image[random3];
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
                <SectionHeading name='Mood of Your Songs'></SectionHeading>
                <div className='moodChart'>
                    <MoodChart data={trackMoods}></MoodChart>
                </div>
            </div>
            <div className='section'>
                <SectionHeading name='Your genere breakdown'></SectionHeading>
                <div className='sectionBody genereChart'>
                    <GenereChart data={genreBreakdown}></GenereChart>
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
    const data= [];
    console.log(props);
    for (let i = 0; i< props["data"].length; i++){
        const dataval = {};
        dataval.moodScore = props["data"][i]["valence"];
        dataval.name = props["data"][i]["id"];
        data.push(dataval);
    }
    console.log(data);

    return (
        <BarChart
            width={1200}
            height={200}
            data={data}
            margin={{
                top: 10, right: 10, left: 0, bottom: 5,
            }}
        >
        <XAxis dataKey="name" tick={false}/>
        <YAxis />
        <Tooltip/>
        <Bar dataKey="moodScore" fill="#8884d8" />
        </BarChart>
    )
}
let GenereChart = (props) => {
    // const data01 = [
    //     { name: 'Rock', value: 25 }, 
    //     { name: 'Metal', value: 30 },
    //     { name: 'Pop', value: 35 }, 
    //     { name: 'Lo-Fi', value: 10 }
    // ];
    const data01 = [];
    for (let i = 0; i< props["data"].length; i++){
        const dataval = {};
        dataval.name = props["data"][i].name;
        dataval.value = props["data"][i].value;
        data01.push(dataval);
    }


    return (
        <PieChart width={800} height={400}
            margin={{
                top: 0, right: 40, left: 20, bottom: 0,
            }}>
            <Pie dataKey='value' data={data01} cx={400} cy={200} innerRadius={80} outerRadius={160} fill="#8884d8" />
            <Tooltip />
        </PieChart>
    )

}

export default Analytics