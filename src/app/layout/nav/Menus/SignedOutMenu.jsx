import React from "react";

const SignedOutMenu = ({ signIn }) => {
  return (
    <div className="collapse navbar-collapse justify-content-between" id="nav">
      <ul className="navbar-nav ml-auto ">
        <li className="nav-item ">
          <button
            type="button"
            className=" nav-link text-light bg-dark text-uppercase font-weight-bold px-3 border-0 mt-2 w-100"
            onClick={signIn}
          >
            <i className="fas fa-user mr-1" />
            Login
          </button>
        </li>

        <li className="nav-item ">
          <button
            className="nav-link text-dark text-uppercase font-weight-bold px-3 border-0 mt-2 w-100"
            onClick={signIn}
          >
            <i className="fas fa-camera-retro mr-1" />
            Swap
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SignedOutMenu;
