import React, { Component } from "react";
import "./Navbar.css";
import Search from "../../../../features/Search/Search";

import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";

class Navbar extends Component {
  state = {
    authenticated: true
  };
  render() {
    const { authenticated } = this.state;
    return (
      <nav className="navbar navbar-expand-md navbar-light nav-background fixed-top">
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
        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </nav>
    );
  }
}

export default Navbar;
