import React from "react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { connect } from "react-redux";
import { login } from "../authActions";

const actions = {
  login
};

const LoginForm = ({ login, handleSubmit }) => {
  return (
    <form className="listing-form  text-center" onSubmit={handleSubmit(login)}>
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
      <button className="btn btn-primary " type="submit">
        Login
      </button>
    </form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "loginForm" })(LoginForm));
