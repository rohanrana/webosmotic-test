import React from "react";
import PropTypes from "prop-types";
import { Input}  from  "antd"
const RadioInput = props => {
  return (
    <Input
      size="large"
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
      name={props.name}
      onBlur={props.onBlur}
      value={props.value}
      className={props.className}
      prefix={props.prefix}
      onChange={props.handleChange}
    />
  );
};

RadioInput.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  ref: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
export default RadioInput;
