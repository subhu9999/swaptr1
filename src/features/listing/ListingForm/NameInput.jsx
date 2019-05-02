import React from "react";
import { Field } from "redux-form";

export default function NameInput() {
  return (
    <div className="form-group ">
      <label className="listing-form-label w-50 mt-2 ml-md-1">
        <Field
          name="name"
          placeholder=" "
          type="text"
          component="input"
          className="form-control listing-form-input "
          spellCheck="false"
        />
        <span className="listing-form-span text-muted">Name</span>
      </label>
    </div>
  );
}
