import React from "react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { connect } from "react-redux";
import { login } from "../authActions";
import { combineValidators, isRequired } from "revalidate";

const actions = {
  login
};

const validate = combineValidators({
  email: isRequired({ message: "Email is a must" }),
  password: isRequired({ message: "Password is required" })
});

const LoginForm = ({
  login,
  handleSubmit,
  error,
  invalid,
  submitting,
  pristine,
  socialLogin
}) => {
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
      {error && <p className="lead text-danger">{error}</p>}
      <button
        disabled={invalid || submitting || pristine}
        className="btn btn-primary btn-block rounded-0"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default connect(
  null,
  actions
)(
  reduxForm({ form: "loginForm", enableReinitialize: true, validate })(
    LoginForm
  )
);
