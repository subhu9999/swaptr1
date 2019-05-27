import React from "react";
import { Form, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import {
  combineValidators,
  matchesField,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from "revalidate";

const validate = combineValidators({
  newPassword1: composeValidators(
    isRequired({ message: "Please enter a password" }),
    hasLengthGreaterThan(5)({
      message: "password must be atleast 6 letters"
    })
  )(),
  newPassword2: composeValidators(
    isRequired({
      message: "Please confirm your new password"
    }),
    matchesField("newPassword1")({ message: "Passwords do not match" })
  )()
});

const AccountPage = ({
  error,
  invalid,
  submitting,
  pristine,
  handleSubmit,
  updatePassword,
  providerId
}) => {
  return (
    <div className="col-md-8">
      <h2>Account</h2>
      {providerId && providerId === "password" && (
        <div>
          <h4>Change Password</h4>
          <p>Use this form to update your account settings</p>
          <Form onSubmit={handleSubmit(updatePassword)}>
            <Field
              width={8}
              name="newPassword1"
              type="password"
              pointing="left"
              inline={true}
              component={TextInput}
              basic={true}
              placeholder="New Password"
            />
            <Field
              width={8}
              name="newPassword2"
              type="password"
              inline={true}
              basic={true}
              pointing="left"
              component={TextInput}
              placeholder="Confirm Password"
            />
            {error && <label className="text-danger">{error}</label>}

            <Button
              disabled={invalid || submitting || pristine}
              variant="success"
              type="submit"
            >
              Update Password
            </Button>
          </Form>
        </div>
      )}

      {providerId && providerId === "facebook.com" && (
        <div>
          <h2>Facebook Account</h2>
          <p>Please visit Facebook to update your account settings</p>
          <Button type="button" variant="primary">
            <i className="fab fa-facebook-square fa-lg mr-2" />
            Go to Facebook
          </Button>
        </div>
      )}

      {providerId && providerId === "google.com" && (
        <div>
          <h2>Google Account</h2>
          <p>Please visit Google to update your account settings</p>
          <Button type="button" variant="primary">
            <i className="fab fa-google fa-lg mr-2" />
            Go to Google
          </Button>
        </div>
      )}
    </div>
  );
};

export default reduxForm({
  form: "account",
  validate
})(AccountPage);
