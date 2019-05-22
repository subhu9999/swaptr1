import React from "react";
import TextInput from "../../../app/common/form/TextInput";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../authActions";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  hasLengthLessThan,
  isNumeric
} from "revalidate";

const actions = {
  registerUser
};

const validate = combineValidators({
  phoneNumber: composeValidators(
    isRequired({ message: "Contact number is required !" }),
    hasLengthLessThan(14)({
      message: "Please enter a valid number"
    }),
    isNumeric({ message: "Please enter a valid number" })
  )(),
  displayName: isRequired({ message: "Name is required" }),
  email: isRequired({ message: "Email is a must" }),
  password: composeValidators(
    isRequired({ message: "Password is required" }),
    hasLengthGreaterThan(6)({
      message: "password must be greater than 6 letters"
    })
  )()
});

const RegisterForm = ({
  handleSubmit,
  registerUser,
  invalid,
  submitting,
  pristine,
  error
}) => {
  return (
    <form
      className="listing-form border "
      onSubmit={handleSubmit(registerUser)}
    >
      <Field
        name="displayName"
        type="text"
        component={TextInput}
        placeholder="Your Name"
      />
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
      {error && <p className="lead text-danger">{error}</p>}
      <button
        disabled={invalid || submitting || pristine}
        className="container-fluid btn btn-large btn-info"
      >
        Register
      </button>
    </form>
  );
};

export default connect(
  null,
  actions
)(
  reduxForm({ form: "registerForm", enableReinitialize: true, validate })(
    RegisterForm
  )
);
