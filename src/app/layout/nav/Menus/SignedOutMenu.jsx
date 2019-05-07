import React from "react";
import { NavLink } from "react-router-dom";
import LoginModal from "../../../../features/modals/LoginModal";

const SignedOutMenu = ({ signIn, openModal }) => {
  return (
    <div className="collapse navbar-collapse justify-content-between" id="nav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button
            type="button"
            className="btn nav-link text-light bg-dark text-uppercase font-weight-bold px-3"
            data-toggle="modal"
            data-target="#loginModal"
          >
            Login
          </button>

          {/* // <!-- Modal --> */}
          <LoginModal />
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
