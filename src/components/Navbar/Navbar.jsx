import React from "react";
import "./Navbar.css";
import Search from "../../features/Search/Search";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-dark fixed-top">
      <button
        type="button"
        className="navbar-toggler bg-light"
        data-toggle="collapse"
        data-target="#nav"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <a href="a" className="navbar-brand">
        <i className="fab fa-sellcast fa-2x text-warning" />
      </a>

      <Search />

      <div
        className="collapse navbar-collapse justify-content-between"
        id="nav"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link text-light text-uppercase font-weight-bold px-3"
              href="/"
            >
              Login
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-light text-uppercase font-weight-bold px-3"
              href="/"
            >
              Swap
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
