import React, { useState } from 'react';
import '../css/Discover.css';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import Filters from './Filters';
import Track from './Track';
import Input from "./Input";

function Discover(props) {
    const [userSearched, setUserSearched] = useState(false);
    const [textValue, setTextValue] = useState('Search Artist or Track');
    let handleSubmit = e => {
        e.preventDefault();
        setUserSearched(true);
    }

    let handleChange = e => {
        setTextValue(e.target.value)
    }

    return (
        <div className='Discover'>
            <div className="discoverBody">
                <form className="searchForm" onSubmit={handleSubmit}>
                    {/* <input value={textValue} onChange={handleChange} type="text"></input> */}
                    <Input
                    inputType={"text"}
                    title={"Find new Music:"}
                    placeholder={"Enter Song Name or Track Name"}
                    handleChange={handleChange}
                    />
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
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>
                    <Track artist="Michael Jackson" title="Bad" length="2:45"></Track>

                </div> : null}

            </div>
        </div>
    )
}

export default Discover;