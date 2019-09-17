import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./SignedInMenu.css";

const SignedInMenu = ({
  signOut,
  profile,
  auth,
  someFalse,
  setChatSeenTrue,
  userChat,
  resetListing
}) => {
  return (
    <div className="collapse navbar-collapse justify-content-between" id="nav">
      <ul className="navbar-nav ml-auto hide-visibility-sm">
        <li className="nav-item ">
          <Link
            className="nav-link btn messages text-light mt-2"
            to={`/chats/${auth.uid}`}
            onClick={() => setChatSeenTrue(userChat)}
          >
            <i className="far fa-comment-alt fa-lg" />
            {someFalse && (
              <span className="badge">
                <i className="fas fa-circle fa-lg" />
              </span>
            )}
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link btn messages text-light mt-2">
            <i className="fas fa-bell fa-lg" />
            <span className="badge">3</span>
          </button>
        </li>

        <li className="nav-item dropdown ">
          <button
            data-toggle="dropdown"
            className="btn nav-link dropdown-toggle user-action text-light"
          >
            <img
              src={profile.photoURL || "/assets/default-user.png"}
              className="rounded-circle img-profile"
              alt="Avatar"
            />{" "}
          </button>
          <ul className="dropdown-menu dropdown-menu-right">
            <li className="dropdown-item">
              Hi,{" "}
              <span className="font-weight-bold ">{profile.displayName}</span>
            </li>
            <li className="divider dropdown-divider" />
            <li className="">
              <Link
                to={`/profile/${auth.uid}`}
                className="dropdown-item signedInList"
              >
                <i className="fas fa-cubes fa-lg " /> My Ads
              </Link>
            </li>
            {/* <li>
              <Link to={`/profile/${auth.uid}`} className="dropdown-item">
                <i className="far fa-id-card fa-lg" /> Edit Profile
              </Link>
            </li> */}
            <li>
              <Link to="/settings" className="dropdown-item signedInList">
                <i className="fa fa-sliders fa-lg" /> Settings
              </Link>
            </li>
            <li className="divider dropdown-divider" />
            <li>
              <button onClick={signOut} className="dropdown-item signedInList">
                <i className="fas fa-sign-out-alt" /> Logout
              </button>
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
            src={profile.photoURL || "/assets/default-user.png"}
            className="rounded-circle img-profile"
            alt="Avatar"
          />{" "}
          <span className="text-light">
            Hi, <span className="font-weight-bold">{profile.displayName}</span>
          </span>
        </li>

        <li className="divider dropdown-divider" />
        <li className="nav-item dropdown ">
          <Link to="/createListing" className=" btn text-light">
            <i className="fas fa-camera fa-lg" />
            <span style={{ marginLeft: "10px" }}>Post Free Ad</span>
          </Link>
        </li>
        <li className="nav-item dropdown ">
          <Link to="/myAds" className=" btn text-light" onClick={resetListing}>
            <i className="fas fa-cubes fa-lg" />
            <span style={{ marginLeft: "10px" }}>My Ads</span>
          </Link>
        </li>
        <li className="nav-item dropdown mt-0">
          <Link
            to={`/chats/${auth.uid}`}
            className=" btn text-light btn messages text-light mt-0"
            onClick={() => setChatSeenTrue(userChat)}
          >
            <i className="far fa-comment-alt fa-lg" />
            {someFalse && (
              <span className="badge ">
                <i className="fas fa-circle fa-lg" />
              </span>
            )}

            <span style={{ marginLeft: "7px" }}>Chats</span>
          </Link>
        </li>
        <li className="nav-item dropdown mt-0">
          <Link
            to="/notifications"
            className="mt-0 btn text-light btn messages text-light"
          >
            <i className="fas fa-bell fa-lg" />
            <span className="badge">3</span>

            <span style={{ marginLeft: "7px" }}>Notifications</span>
          </Link>
        </li>
        {/* <li className="nav-item dropdown">
          <Link to="/editProfile" className=" btn text-light">
            <button className="nav-link btn text-light">
              <i className="far fa-id-card fa-lg" />
              <span style={{ marginLeft: "7px" }}>Edit Profile</span>
            </button>
          </Link>
        </li> */}
        <li className="nav-item dropdown">
          <Link to="/settings" className=" btn text-light">
            <i className="fa fa-sliders fa-lg" />
            <span style={{ marginLeft: "7px" }}>Settings</span>
          </Link>
        </li>
        <li className="divider dropdown-divider" />
        <li className="nav-item">
          <button onClick={signOut} className="btn nav-link text-light">
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
