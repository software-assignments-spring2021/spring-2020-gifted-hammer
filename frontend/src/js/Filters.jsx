import React, { useState } from 'react';
import '../css/Filters.css'
import filterButton from '../assets/filters.svg'

const filterNames = ['popularity', 'tempo', 'energy', 'danceable', 'vocals', 'mood'];
function Filters(props) {
    const [sliderValues, setSliderValues] = useState({
        popularity: .5,
        tempo: .5,
        energy: .5,
        danceable: .5,
        vocals: .5,
        mood: .5
    })

    const [faceImage, setFaceImage] = useState(null);

    const [visible, setVisible] = useState(false);

    const handleSubmit = e => {
        const formData = new FormData()
        formData.append('face', faceImage)
      
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            body: formData
        }
        fetch('/face', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    

    }
    let handleChange = e => {
        e.persist();
        setSliderValues({ ...sliderValues, [e.target.id]: parseFloat(e.target.value) })
    }

    const handleImageUpload = e => {
        console.log(e.target.files);
        setFaceImage(e.target.files[0]);

    }

    let createSliders = () => {
        return (
            <div className={visible ? 'filterSliders visible' : 'filterSliders'}>
                {
                    filterNames.map((filter, index) => (
                        <div className="filterSliderPair" key={filter}>
                           
                            <p>{filter}</p>
                            <input className="filterSlider"
                                id={filter}
                                onChange={handleChange}
                                onMouseUp={props.sliderValueChanged}
                                onTouchEnd={props.sliderValueChanged}
                                value={sliderValues[index]}
                                type="range" min="0" max="1"
                                step=".01"
                                >
                                
                            </input>

                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className={visible ? 'Filters visible' : 'Filters'}>
            <img className='filterButton' src={filterButton} onClick={e => setVisible(!visible)} alt='filter-sliders'/>
            {createSliders()}
            <form onSubmit={handleSubmit}>
                select photo for mood detection<input onChange={handleImageUpload} name='face' className='fileChooser' type="file" capture="camera"></input>
                <input type='submit' value='Upload' ></input>
            </form>


        </div>
    )
}

export default Filters;