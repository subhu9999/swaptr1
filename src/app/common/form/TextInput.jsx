import React from "react";
import { Field } from "redux-form";

const TextInput = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <label className="listing-form-label ">
      <Field {...input} placeholder={placeholder} type={type} />
      {touched && error && <label>{error}</label>}
    </label>
  );
};

export default TextInput;
