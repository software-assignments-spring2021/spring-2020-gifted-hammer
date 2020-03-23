import React from 'react';
import '../css/Analytics.css'
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';

let Analytics = (props) => {
    return (
        <div className="analytics">
            <div className='section overview'>
                <div className="overviewOne">
                    <Metric value="10,123" descriptor="minutes of music"></Metric>
                </div>
                <div className="overviewTwo">
                    <Metric value="17" descriptor="Albums"></Metric>
                    <Metric value="200" descriptor="Artists"></Metric>
                    <Metric value="400" descriptor="Songs"></Metric>
                </div>
            </div>
            <div className='section genres'>
                <Genere name="rock"></Genere>
                <Genere name="pop"></Genere>
                <Genere name="metal"></Genere>
            </div>
            <div className='section topSong'>
                <div className="topSongOne">
                    <Metric value="Thriller" descriptor="Michael Jackson"></Metric>
                    <p>You listened 500 times!</p>
                </div>
                <div className="topImg"></div>
            </div>
            <div className='section mood'>
                <MoodChart></MoodChart>
            </div>
        </div>
    )
}
let Metric = (props) => {
    return (
        <div className="metric">
            <h3>{props.value}</h3>
            <h4>{props.descriptor}</h4>
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
            name: 'Jan', uv: 4000, moodScore: 2400, amt: 2400,
        },
        {
            name: 'Feb', uv: 3000, moodScore: 1398, amt: 2210,
        },
        {
            name: 'March', uv: 2000, moodScore: 9800, amt: 2290,
        },
        {
            name: 'April', uv: 2780, moodScore: 3908, amt: 2000,
        },
        {
            name: 'May', uv: 1890, moodScore: 4800, amt: 2181,
        },
        {
            name: 'June', uv: 2390, moodScore: 3800, amt: 2500,
        },
        {
            name: 'July', uv: 3490, moodScore: 4300, amt: 2100,
        },
    ];
    return (
        <LineChart
            width={400}
            height={200}
            data={data}
            margin={{
                top: 20, right: 30, left: 20, bottom: 5,
            }}
        >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="moodScore" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    )
}
export default Analytics