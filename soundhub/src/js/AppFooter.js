import React from 'react';
import '../css/AppFooter.css'
import {
    Link
} from "react-router-dom";

const AppFooter = (props) =>
{
    return (
        <div className="AppFooter">
            <Link className="footerLink" to='/discover'>Discover</Link>
            <Link className="footerLink" to='/analytics'>Analytics</Link>
        </div>
    )
}
export default AppFooter;