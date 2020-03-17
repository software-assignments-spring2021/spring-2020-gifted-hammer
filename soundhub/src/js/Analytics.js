import React, { useState } from 'react';
import '../css/Analytics.css'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import Filters from './Filters'
import Track from './Track'
import App from '../App';

let Analytics = props =>
{
    return(
        <div className="Analytics">
            <AppHeader pageTitle="ANALYTICS"/>
            <AppFooter/>

        </div>
    )
}
export default Analytics