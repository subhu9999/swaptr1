import React from "react";

export default function NavbarAlt({ goHome }) {
  return (
    <nav className="navbar navbar-expand-md navbar-light nav-background fixed-top ">
      {/* <a href="/" className="navbar-brand ">
        <i className="fas fa-arrow-left text-light mr-2" />

        <span className="text-light ml-1">Swaptr</span>
      </a> */}
      <button onClick={goHome} className="btn btn-link navbar-brand ">
        <i className="fas fa-arrow-left text-light mr-2" />

        <span className="text-light ml-1">Swaptr</span>
      </button>
    </nav>
  );
}
