import React from "react";
import TextInput from "../../../app/common/form/TextInput";
import { Field, reduxForm } from "redux-form";

const RegisterForm = () => {
  return (
    <form className="listing-form border ">
      <Field
        name="phoneNumber"
        type="text"
        component={TextInput}
        placeholder="Contact Number"
      />

      <Field
        name="email"
        type="text"
        component={TextInput}
        placeholder="Email"
      />

      <Field
        name="password"
        type="password"
        component={TextInput}
        placeholder="Password"
      />
      <button className="container-fluid btn btn-large">Register</button>
    </form>
  );
};

export default reduxForm({ form: "registerForm" })(RegisterForm);
