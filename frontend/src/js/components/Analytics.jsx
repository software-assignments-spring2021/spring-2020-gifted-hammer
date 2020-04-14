import React from 'react';
import '../../css/Analytics.css'
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie
} from 'recharts';
import { useState, useEffect } from 'react';
let Analytics = (props) => {

    const [data, setData] = useState({})
    const [hasError, setErrors] = useState(false);
    async function fetchData() {
        const res = await fetch("https://my.api.mockaroo.com/analytics.json?key=e5acc930");
        res
            .json()
            .then(res => setData(res))
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="analytics">
            <div className='section'>
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
            </div>
            <div className='section'>
                <SectionHeading name="Favorite generes"></SectionHeading>
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
                        <Metric value="Thriller" descriptor="Michael Jackson"></Metric>
                        <p>You listened 500 times!</p>
                    </div>
                    <div className="topImg"></div>
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
            name: 'Jan', avgMoodScore: 25,
        },
        {
            name: 'Feb', avgMoodScore: 91,
        },
        {
            name: 'Mar', avgMoodScore: 70,
        },
        {
            name: 'Apr', avgMoodScore: 27,
        },
        {
            name: 'May', avgMoodScore: 33,
        },
        {
            name: 'Jun', avgMoodScore: 65,
        },
        {
            name: 'Jul', avgMoodScore: 70,
        },
    ];
    return (
        <LineChart
            width={400}
            height={200}
            data={data}
            margin={{
                top: 20, right: 30, left: 0, bottom: 5,
            }}
        >
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Line type="monotone" dataKey="avgMoodScore" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
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