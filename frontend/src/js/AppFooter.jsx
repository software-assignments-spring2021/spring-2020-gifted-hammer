import React from 'react';
import '../css/AppFooter.css'
import {
    Link
} from "react-router-dom";

import discoverImage from '../assets/discover.svg'
import analyticsImage from '../assets/analytics.svg'
const AppFooter = (props) => {
    return (
        <div className="AppFooter">
            <Link className="footerLink" to='/discover'><img className="footerImage" src={discoverImage} alt='magnifying class'/></Link>
            <Link className="footerLink" to='/analytics'><img className="footerImage" src={analyticsImage} alt='graph'/></Link>
        </div>
    )
}
export default AppFooter;