import React from "react";
import { Link } from "react-router-dom";

export default function ProductInputSearch({ input, placeholder }) {
  return (
    <div className="input-group search-width ">
      <input
        {...input}
        className="form-control search-input rounded-0"
        type="text"
        placeholder={placeholder}
        style={{ height: "8vh" }}
      />
      <div className="input-group-append">
        <Link to={"/search/led"} className="btn btn-light rounded-0">
          <i className="fas fa-search text-dark mt-2" />
        </Link>
      </div>
    </div>
  );
}
