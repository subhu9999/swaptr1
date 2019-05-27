import React from "react";
import "./SettingsDashboard.css";
import { Switch, Route, Redirect } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import { NavLink } from "react-router-dom";
import Navbar from "../../../app/layout/nav/Navbar/Navbar";
import { connect } from "react-redux";
import { updatePassword } from "../../auth/authActions";
import { updateProfile } from "../../user/userActions";

const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});

const actions = {
  updatePassword,
  updateProfile
};

const SettingsDashboard = ({
  updatePassword,
  providerId,
  user,
  updateProfile
}) => {
  return (
    <div className="row settingsDashboard">
      <Navbar />
      <div className="col-4">
        <NavLink
          to="/settings/editProfile"
          className="btn  btn-primary btn-block"
        >
          Edit Profile
        </NavLink>

        <NavLink
          to="/settings/changePassword"
          className="btn btn-primary btn-block mb-2 mt-4"
        >
          Change Password
        </NavLink>
      </div>

      <div className="col-8">
        <Switch>
          <Redirect exact from="/settings" to="/settings/editProfile" />
          <Route
            path="/settings/editProfile"
            render={() => (
              <EditProfile initialValues={user} updateProfile={updateProfile} />
            )}
          />
          <Route
            path="/settings/changePassword"
            render={() => (
              <ChangePassword
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default connect(
  mapState,
  actions
)(SettingsDashboard);
