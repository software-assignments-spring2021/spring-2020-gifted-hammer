import React, { useState, useEffect } from 'react';
import '../css/Filters.css'
import filterButton from '../assets/filters.svg'

const filterNames = ['popularity', 'tempo', 'energy', 'danceable', 'vocals', 'mood'];
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

    let createSliders = () => {
        return (
            <div className={visible ? 'filterSliders visible' : 'filterSliders'}>
                {
                    filterNames.map((filter, index) => (
                        <div className="filterSliderPair"  key={filter}>
                           
                            <p>{filter}</p>
                            <input className="filterSlider"
                                id={filter}
                                onChange={handleChange}
                                onMouseUp={props.sliderValueChanged}
                                onTouchEnd={props.sliderValueChanged}
                                value={sliderValues[index]}
                                type="range" min="1" max="100">
                            </input>

                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className={visible ? 'Filters visible' : 'Filters'}>
            <img className='filterButton' src={filterButton} onClick={e => setVisible(!visible)} />
            {createSliders()}
        </div>
    )
}

export default Filters;