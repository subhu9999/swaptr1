import React from "react";

const DescriptionInput = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <div className="form-group ml-md-4">
      <label className="listing-form-label ">
        <textarea
          {...input}
          placeholder=" "
          type="text"
          rows={4}
          className="form-control listing-form-input"
          spellCheck="false"
          maxLength={250}
        />
        <span className="listing-form-span text-muted">Description</span>
      </label>
      {touched && error && <label className="text-danger ">{error}</label>}
    </div>
  );
};

export default DescriptionInput;
