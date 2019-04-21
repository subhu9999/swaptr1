import React from "react";
import "./SettingsDashboard.css";
import { Switch, Route, Redirect } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import { NavLink } from "react-router-dom";
import Navbar from "../../../app/layout/nav/Navbar/Navbar";

const SettingsDashboard = () => {
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
          <Route path="/settings/editProfile" component={EditProfile} />
          <Route path="/settings/changePassword" component={ChangePassword} />
        </Switch>
      </div>
    </div>
  );
};

export default SettingsDashboard;
