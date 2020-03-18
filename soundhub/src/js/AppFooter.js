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
            <Link className="footerLink" to='/discover'><img className="footerImage" src={discoverImage} /></Link>
            <Link className="footerLink" to='/analytics'><img className="footerImage" src={analyticsImage} /></Link>
        </div>
    )
}
export default AppFooter;