import React from "react";

export default function NameInput({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) {
  return (
    <div className="form-group ">
      <label className="listing-form-label w-50 mt-2 ml-md-1">
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
        <span className="listing-form-span text-muted">Name</span>
      </label>
      {touched && error && <label className="ml-3 text-danger ">{error}</label>}
    </div>
  );
}
