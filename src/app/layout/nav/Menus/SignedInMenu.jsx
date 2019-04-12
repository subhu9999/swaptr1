import React from "react";
import { NavLink } from "react-router-dom";
import "./SignedInMenu.css";

const SignedInMenu = () => {
  const num = 4;
  return (
    <div className="collapse navbar-collapse justify-content-between" id="nav">
      <ul className="navbar-nav ml-auto hide-visibility-sm">
        <li className="nav-item">
          <button className="nav-link btn messages text-light mt-2">
            <i className="far fa-comment-alt fa-lg" />
            {num > 1 && <span className="badge">{num}</span>}
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link btn messages text-light mt-2">
            <i className="fas fa-bell fa-lg" />
            <span className="badge">3</span>
          </button>
        </li>

        <li className="nav-item dropdown">
          <button
            data-toggle="dropdown"
            className="btn nav-link dropdown-toggle user-action text-light"
          >
            <img
              src="https://www.tutorialrepublic.com/examples/images/avatar/2.jpg"
              className="rounded-circle avatar"
              alt="Avatar"
            />{" "}
          </button>
          <ul className="dropdown-menu">
            <li className="dropdown-item">
              Hi, <span className="font-weight-bold">Subhu</span>
            </li>
            <li className="divider dropdown-divider" />
            <li>
              <a href="a" className="dropdown-item">
                <i className="fas fa-cubes fa-lg" /> My Ads
              </a>
            </li>
            <li>
              <a href="a" className="dropdown-item">
                <i className="far fa-id-card fa-lg" /> Edit Profile
              </a>
            </li>
            <li>
              <a href="a" className="dropdown-item">
                <i className="fa fa-sliders fa-lg" /> Settings
              </a>
            </li>
            <li className="divider dropdown-divider" />
            <li>
              <a href="a" className="dropdown-item">
                <i className="fas fa-sign-out-alt" /> Logout
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link text-light text-uppercase font-weight-bold mt-2 "
            href="/"
            to="/createListing"
          >
            <i className="fas fa-camera fa-lg mr-1" />
            Swap
          </NavLink>
        </li>
      </ul>

      {/* small screen menus */}
      <ul className="navbar-nav ml-auto hide-visibility-lg text-light">
        <li className="nav-item dropdown mt-2">
          <img
            src="https://www.tutorialrepublic.com/examples/images/avatar/2.jpg"
            className="rounded-circle avatar"
            alt="Avatar"
          />{" "}
          <span className="text-light">
            Hi, <span className="font-weight-bold">Mariyln</span>
          </span>
        </li>

        <li className="divider dropdown-divider" />
        <li className="nav-item dropdown mt-2">
          <i className="fas fa-camera fa-lg" />
          <span style={{ marginLeft: "20px" }}>Post Free Ad</span>
        </li>
        <li className="nav-item dropdown mt-2">
          <i className="fas fa-cubes fa-lg" />
          <span style={{ marginLeft: "20px" }}>My Ads</span>
        </li>
        <li className="nav-item">
          <button className="nav-link btn messages text-light">
            <i className="far fa-comment-alt fa-lg" />
            {num > 1 && <span className="badge ">{num}</span>}

            <span style={{ marginLeft: "7px" }}>Chats</span>
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link btn messages text-light">
            <i className="fas fa-bell fa-lg" />
            <span className="badge">3</span>

            <span style={{ marginLeft: "7px" }}>Notifications</span>
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link btn text-light">
            <i className="far fa-id-card fa-lg" />
            <span style={{ marginLeft: "7px" }}>Edit Profile</span>
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link btn text-light">
            <i className="fa fa-sliders fa-lg" />
            <span style={{ marginLeft: "7px" }}>Settings</span>
          </button>
        </li>
        <li className="divider dropdown-divider" />
        <li className="nav-item">
          <button className="btn nav-link text-light">
            <i className="fas fa-sign-out-alt fa-lg" /> Logout
          </button>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link text-light text-uppercase font-weight-bold mt-2 "
            href="/"
            to="/createListing"
          >
            Swap2
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedInMenu;
