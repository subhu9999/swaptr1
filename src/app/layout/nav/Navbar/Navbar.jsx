import React, { Component } from "react";
import "./Navbar.css";
import Search from "../../../../features/search/Search";
import { withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";

class Navbar extends Component {
  state = {
    authenticated: false
  };

  handleSignIn = () => {
    this.setState({
      authenticated: true
    });
  };

  handleSignOut = () => {
    this.setState({
      authenticated: false
    });
    this.props.history.push("/");
  };
  render() {
    const { authenticated } = this.state;
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
          <SignedInMenu signOut={this.handleSignOut} />
        ) : (
          <SignedOutMenu signIn={this.handleSignIn} />
        )}
      </nav>
    );
  }
}

export default withRouter(Navbar);
