import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthLessThan,
  isNumeric
} from "revalidate";

const validate = combineValidators({
  phoneNumber: composeValidators(
    isRequired({ message: "Contact number is required !" }),
    hasLengthLessThan(14)({
      message: "Please enter a valid number"
    }),
    isNumeric({ message: "Please enter a valid number" })
  )(),
  displayName: isRequired({ message: "Name is required" })
});

class EditProfile extends Component {
  render() {
    const {
      pristine,
      submitting,
      invalid,
      handleSubmit,
      updateProfile
    } = this.props;
    return (
      <div className="col-md-8 text-center ">
        <h2>Edit Profile</h2>
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="User Name"
          />
          <Field
            name="phoneNumber"
            type="text"
            component={TextInput}
            placeholder="Phone Number"
          />

          <button
            className="btn btn-success rounded-0 "
            disabled={pristine || submitting || invalid}
            type="submit"
          >
            Update Profile
          </button>
        </Form>
      </div>
    );
  }
}

export default reduxForm({
  form: "userProfile",
  validate,
  enableReinitialize: true,
  destroyOnUnmount: false
})(EditProfile);
