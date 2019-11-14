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
    const { auth, profile } = this.props;
    const { signOut } = this;
    return (
      <div>
        <NavbarAlt goHome={this.goBack} />
        {/* <button className="btn mt-4" onClick={() => this.goBack()}>
          <i className="fas fa-chevron-left fa-2x"></i>
        </button> */}
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
        <li className="user-options-mobile dropdown mt-0">
          <Link to="/notifications" className="mt-0 btn ">
            <i className="fas fa-bell fa-lg" />

            <span style={{ marginLeft: "7px" }}>Notifications</span>
          </Link>
        </li>
        {/* <li className="user-options-mobile dropdown">
            <Link to="/editProfile" className=" btn text-light">
              <button className="nav-link btn text-light">
                <i className="far fa-id-card fa-lg" />
                <span style={{ marginLeft: "7px" }}>Edit Profile</span>
              </button>
            </Link>
          </li> */}
        <li className="user-options-mobile dropdown">
          <Link to="/settings" className=" btn">
            <i className="fas fa-cog fa-lg"></i>

            <span style={{ marginLeft: "7px" }}>Settings</span>
          </Link>
        </li>
        <li className="user-options-mobile dropdown">
          <Link to="/" className=" btn">
            <i className="far fa-question-circle fa-lg"></i>
            <span style={{ marginLeft: "7px" }}>Help & Support</span>
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
