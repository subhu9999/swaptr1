import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-dark fixed-top">
      <a href="/" className="navbar-brand">
        <i className="fab fa-sellcast fa-2x text-warning" />
      </a>

      <button
        type="button"
        className="navbar-toggler bg-light"
        data-toggle="collapse"
        data-target="#nav"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="collapse navbar-collapse justify-content-between"
        id="nav"
      >
        <ul className="navbar-nav ">
          <li className="nav-item">
            <a
              className="nav-link text-light text-uppercase font-weight-bold px-3"
              href="#"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-light text-uppercase font-weight-bold px-3"
              href="#"
            >
              Skills
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link text-light text-uppercase font-weight-bold px-3 dropdown-toggle"
              href="/"
              data-toggle="dropdown"
            >
              Projects
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Project 1
              </a>
              <a className="dropdown-item" href="#">
                Project 2
              </a>
              <a className="dropdown-item" href="#">
                Project 3
              </a>
              <a className="dropdown-item" href="#">
                Project 4
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-light text-uppercase font-weight-bold px-3"
              href="#"
            >
              Team
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-light text-uppercase font-weight-bold px-3"
              href="#"
            >
              Contact
            </a>
          </li>
        </ul>

        <form className="form-inline ml-3">
          <div className="input-group">
            <input className="form-control" type="text" placeholder="Search" />
            <div className="input-group-append">
              <button type="button" className="btn btn-light">
                <i className="fas fa-search text-muted" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
