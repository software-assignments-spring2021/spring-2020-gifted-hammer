import React, { useState } from 'react';
import '../css/Analytics.css'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import Filters from './Filters'
import Track from './Track'
import App from '../App';

let Analytics = (props) =>
{
    return(
        <div className="Analytics">
            <AppHeader pageTitle="ANALYTICS"/>
            <AppFooter/>
            <div className="analyticsBody">
            <div className="category">
              <p className="title">This month you listened to...</p>
              <p className="minutes">10,123</p>
              <p className="center">minutes of music</p>
              <div className="otherMetrics">
                <div className="metric">
                  <p className="metricText">17</p>
                  <p className="center">albums</p>
                </div>
                <div className="metric">
                  <p className="metricText">200</p>
                  <p className="center">artists</p>
                </div>
                <div className="metric">
                  <p className="metricText">250</p>
                  <p className="center">songs</p>
                </div>
              </div>
            </div>
            <div className="category">
              <p className="title">Favorite Genres This Month</p>
            </div>
            <div className="category">
              <p className="title">Top Song of the Month</p>
            </div>
            <div className="category">
              <p className="title">Average Track Mood This Month</p>
            </div>
            </div>
        </div>
    )
}
export default Analytics
