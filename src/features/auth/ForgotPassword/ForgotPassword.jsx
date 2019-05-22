import React from "react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { connect } from "react-redux";
import { forgotPassword } from "../authActions";
import { combineValidators, isRequired } from "revalidate";

const actions = {
  forgotPassword
};

const validate = combineValidators({
  email: isRequired({ message: "Email is a must" })
});

const ForgotPassword = ({
  forgotPassword,
  handleSubmit,
  error,
  invalid,
  submitting,
  pristine
}) => {
  return (
    <form
      className="listing-form  text-center"
      onSubmit={handleSubmit(forgotPassword)}
    >
      <Field
        name="email"
        type="text"
        component={TextInput}
        placeholder="Email"
      />

      {error && <p className="lead text-danger">{error}</p>}
      <button
        disabled={invalid || submitting || pristine}
        className="btn btn-primary "
        type="submit"
      >
        Send Verfication Link
      </button>
    </form>
  );
};

export default connect(
  null,
  actions
)(
  reduxForm({ form: "ForgotPasswordForm", enableReinitialize: true, validate })(
    ForgotPassword
  )
);
