import React from "react";
import { Field } from "redux-form";

export default function PhoneInput() {
  return (
    <div className="form-group ">
      <label className="listing-form-label w-50 mt-2 ml-md-1">
        <Field
          name="sellerPhoneNumber"
          placeholder=" "
          component="input"
          type="text"
          className="form-control listing-form-input "
        />
        <span className="listing-form-span text-muted">
          <i className="fas fa-mobile-alt fa-lg mr-2 h4 mt-1 mb-1" />
          Phone
        </span>
      </label>
    </div>
  );
}
