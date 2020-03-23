import React from "react";
import '../css/Input.css'
import filterButton from '../assets/filters.svg'

const Input = props => {
  //console.log(props.value);
  return (
    <div className="form-group">
      <label className="form-label">
        {props.title}
      </label>
      <div className='input'>
        <input
          className="form-control"
          title={props.title}
          value={props.value}
          onChange={props.handleChange}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
