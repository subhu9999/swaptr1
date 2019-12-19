import "./UserOptions.css";
import { Link } from "react-router-dom";
import NavbarAlt from "../../../app/layout/nav/Navbar/NavbarAlt";

import React, { Component } from "react";
import { withFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

class UserOptions extends Component {
  goBack = () => {
    this.props.history.goBack();
  };
  signOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };
  render() {
    const { profile } = this.props;
    const { signOut } = this;
    return (
      <div>
        <NavbarAlt goHome={this.goBack} />

        <div className="margin-top-user-options">
          <img
            src={profile.photoURL || "/assets/default-user.png"}
            className="rounded-circle img-user-options "
            alt="Avatar"
          />{" "}
          <span className="">
            Hi, <span className="font-weight-bold">{profile.displayName}</span>
          </span>
        </div>
        <li className="divider dropdown-divider" />
        <li className="user-options-mobile dropdown mt-0 ">
          <button to="/notifications" className="mt-0 btn text-muted" disabled>
            <i className="fas fa-bell fa-lg" />

            <span style={{ marginLeft: "7px" }}>Notifications</span>
          </button>
        </li>
        <li className="user-options-mobile dropdown">
          <Link to="/settings" className=" btn">
            <i className="fas fa-cog fa-lg"></i>

            <span style={{ marginLeft: "7px" }}>Settings</span>
          </Link>
        </li>
        <li className="user-options-mobile dropdown">
          <Link to="/termsOfService" className=" btn">
            <i className="far fa-file-alt fa-lg"></i>
            <span style={{ marginLeft: "7px" }}>Terms Of Service</span>
          </Link>
        </li>
        <li className="user-options-mobile dropdown">
          <Link to="/privacyPolicy" className=" btn">
            <i className="far fa-file-alt fa-lg"></i>
            <span style={{ marginLeft: "7px" }}>Privacy Policy</span>
          </Link>
        </li>
        <li className="user-options-mobile dropdown">
          <Link to="/" className=" btn">
            <i className="far fa-question-circle fa-lg"></i>
            <span style={{ marginLeft: "7px" }}>Help / Contact us</span>
          </Link>
        </li>
        <li className="divider dropdown-divider" />

        <li className="user-options-mobile">
          <button className="btn nav-link" onClick={signOut}>
            <i className="fas fa-sign-out-alt fa-lg" /> Logout
          </button>
        </li>
      </div>
    );
  }
}

export default compose(withFirebase, connect(mapState))(UserOptions);
