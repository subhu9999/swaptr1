import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutMenu = ({ signIn }) => {
  return (
    <div className="collapse navbar-collapse justify-content-between" id="nav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button
            onClick={signIn}
            className="btn nav-link text-light bg-dark text-uppercase font-weight-bold px-3"
          >
            Login
          </button>
        </li>
        <li className="nav-item bg-light">
          <NavLink
            className="nav-link text-dark text-uppercase font-weight-bold px-3"
            href="/"
            to="/createListing"
          >
            <i className="fas fa-camera-retro mr-1" />
            Swap
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedOutMenu;
