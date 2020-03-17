import React from "react";
import '../css/Input.css'

const Input = props => {
  //console.log(props.value);
  return (
    <div className="form-group">
      <label for={props.title} className="form-label">
        {props.title}
      </label>
      <input
        className="form-control"
        title={props.title}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
