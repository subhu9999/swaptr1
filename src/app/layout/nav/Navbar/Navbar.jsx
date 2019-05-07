import React, { Component } from "react";
import "./Navbar.css";
import Search from "../../../../features/search/Search";
import { withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { connect } from "react-redux";
import { openModal } from "../../../../features/modals/modalActions";
import { logout } from "../../../../features/auth/authActions";

const actions = {
  openModal,
  logout
};

const mapState = state => ({
  auth: state.auth
});

class Navbar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.logout();
    this.props.history.push("/");
  };
  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated;
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
          <SignedInMenu
            currentUser={auth.currentUser}
            signOut={this.handleSignOut}
          />
        ) : (
          <SignedOutMenu signIn={this.handleSignIn} />
        )}
      </nav>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(Navbar)
);
