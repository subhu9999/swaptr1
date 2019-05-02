import React from "react";

const LocationInput = ({
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
          type={type}
          className={
            "form-control listing-form-input" +
            (touched && error
              ? "form-control listing-form-input border-danger"
              : "")
          }
          spellCheck="false"
        />
        <span className="listing-form-span text-muted">
          <i className="fas fa-map-marker-alt fa-lg mr-1" />
          Location*
        </span>
      </label>
      {touched && error && <label className="text-danger ">{error}</label>}
    </div>
  );
};

export default LocationInput;
