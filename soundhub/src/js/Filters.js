import React, { useState, useEffect } from 'react';
import '../css/Filters.css'
import filterButton from '../assets/filters.svg'
import { Slider, Handles, Tracks } from 'react-compound-slider'

function Filters(props) {
    const [sliderValues, setSliderValues] = useState({
        popularity: 50,
        tempo: 50,
        energy: 50,
        danceable: 50,
        vocals: 50,
        mood: 50
    })

    const [visible, setVisible] = useState(false);

    let handleChange = e => {
        e.persist();
        setSliderValues({ ...sliderValues, [e.target.id]: parseFloat(e.target.value) })
    }

    return (
        <div className={visible ? 'Filters visible' : 'Filters'}>
            <img className='filterButton' src={filterButton} onClick={e => setVisible(!visible)} />
            <div className={visible ? 'filterSliders visible' : 'filterSliders'}>
                <div className="filterSliderPair">
                    <p>popularity</p>
                    <input className="filterSlider" id="popularity" onChange={handleChange} value={sliderValues['popularity']} type="range" min="1" max="100"></input>
                </div>

                <div className="filterSliderPair">
                    <p>tempo</p>
                    <input className="filterSlider" id="tempo" onChange={handleChange} value={sliderValues['tempo']} type="range" min="1" max="100"></input>
                </div>

                <div className="filterSliderPair">
                    <p>energy</p>
                    <input className="filterSlider" id="energy" onChange={handleChange} value={sliderValues['energy']} type="range" min="1" max="100"></input>
                </div>

                <div className="filterSliderPair">
                    <p>danceable</p>
                    <input className="filterSlider" id="danceable" onChange={handleChange} value={sliderValues['danceable']} type="range" min="1" max="100"></input>
                </div>

                <div className="filterSliderPair">
                    <p>vocals</p>
                    <input className="filterSlider" id="vocals" onChange={handleChange} value={sliderValues['vocals']} type="range" min="1" max="100"></input>
                </div>

                <div className="filterSliderPair">
                    <p>mood</p>
                    <input className="filterSlider" id="mood" onChange={handleChange} value={sliderValues['mood']} type="range" min="1" max="100"></input>
                </div>
            </div>

        </div>
    )
}

export default Filters;