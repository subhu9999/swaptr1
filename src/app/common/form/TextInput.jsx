import React from "react";

const TextInput = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <div className="form-group ml-md-4">
      <label className="listing-form-label ">
        <input
          {...input}
          placeholder=" "
          type="text"
          className={
            "form-control listing-form-input" +
            (touched && error
              ? "form-control listing-form-input border-danger"
              : "")
          }
          spellCheck="false"
          maxLength={70}
        />
        <span className="listing-form-span text-muted">{placeholder}</span>
      </label>
      {touched && error && <label className="text-danger ">{error}</label>}
    </div>
  );
};

export default TextInput;
