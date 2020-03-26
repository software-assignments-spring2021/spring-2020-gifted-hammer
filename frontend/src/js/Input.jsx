import React from "react";
import '../css/Input.css'

const Input = props => {
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
