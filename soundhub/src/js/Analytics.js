import React, { useState } from 'react';
import '../css/Analytics.css'
import Filters from './Filters'
import Track from './Track'
import App from '../App';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, PieChart, Pie, Tooltip,
} from 'recharts';

let Analytics = (props) => {
    return (
        <div className="analytics">
            <div className='section'>
                <SectionHeading name="This month you listened to..."></SectionHeading>
                <div className='overview'>
                    <div className="overviewOne">
                        <BigMetric value="10,123" descriptor="Minutes of music"></BigMetric>
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
let GenereChart = (props) => {
    const data01 = [{ name: 'Group A', value: 2400 }, { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 }, { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 }, { name: 'Group F', value: 4800 }];


    return (
        <PieChart width={400} height={400}>
            <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label="name" />
            <Tooltip />
        </PieChart>
    )

}

export default Analytics