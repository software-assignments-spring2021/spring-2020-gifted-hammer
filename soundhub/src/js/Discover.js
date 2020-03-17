import React, { useState } from 'react';
import '../css/Discover.css'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import Filters from './Filters'
import Track from './Track'

function Discover(props) {
    const [userSearched, setUserSearched] = useState(false);
    const [textValue, setTextValue] = useState('Search an artist or track');

    let handleSubmit = e => {
        e.preventDefault();
        setUserSearched(true);
    }

    let handleChange = e => {
        setTextValue(e.target.value)
    }

    return (
        <div className='Discover'>
            <AppHeader pageTitle='DISCOVER' />
            <div className="discoverBody">
                <form className="searchForm" onSubmit={handleSubmit}>
                    <input value={textValue} onChange={handleChange} type="text"></input>
                </form>
                {userSearched ? <Filters /> : null}
                {userSearched ? <div className="tracks">
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                </div> : null}

            </div>


            <AppFooter />

        </div>
    )
}

export default Discover;