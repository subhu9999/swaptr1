import React from "react";
import TextInput from "../../../app/common/form/TextInput";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { updateProfile } from "../../user/userActions";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthLessThan,
  isNumeric
} from "revalidate";

const actions = {
  updateProfile
};

const validate = combineValidators({
  phoneNumber: composeValidators(
    isRequired({ message: "Contact number is required !" }),
    hasLengthLessThan(14)({
      message: "Please enter a valid number"
    }),
    isNumeric({ message: "Please enter a valid number" })
  )()
});

const PhoneNumberForm = ({
  handleSubmit,
  invalid,
  submitting,
  pristine,
  error,
  updateProfile
}) => {
  return (
    <form
      className="listing-form border"
      onSubmit={handleSubmit(updateProfile)}
    >
      <Field
        name="phoneNumber"
        type="text"
        component={TextInput}
        placeholder="Contact Number"
      />

      {error && <p className="lead text-danger">{error}</p>}
      <button
        disabled={invalid || submitting || pristine}
        className="btn btn-block btn-large btn-info rounded-0"
      >
        verify phone number
      </button>
    </form>
  );
};

export default connect(
  null,
  actions
)(
  reduxForm({ form: "phoneNumberForm", enableReinitialize: true, validate })(
    PhoneNumberForm
  )
);
