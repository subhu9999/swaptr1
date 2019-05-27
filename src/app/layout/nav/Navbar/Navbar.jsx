import React, { Component } from "react";
import "./Navbar.css";
import Search from "../../../../features/search/Search";
import { withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { connect } from "react-redux";
import { openModal } from "../../../../features/modals/modalActions";
import { withFirebase } from "react-redux-firebase";

const actions = {
  openModal
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

class Navbar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };
  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <nav className="navbar navbar-expand-md navbar-light nav-background fixed-top ">
        <button
          type="button"
          className="navbar-toggler bg-light"
          data-toggle="collapse"
          data-target="#nav"
        >
          <span className="navbar-toggler-icon" />
          <span className="badge-toggler text-light">3</span>
        </button>
        <a href="/" className="navbar-brand">
          <i className="fab fa-sellcast fa-2x text-warning" />
        </a>

        <Search />
        {authenticated ? (
          <SignedInMenu profile={profile} signOut={this.handleSignOut} />
        ) : (
          <SignedOutMenu
            signIn={this.handleSignIn}
            register={this.handleRegister}
          />
        )}
      </nav>
    );
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(Navbar)
  )
);
