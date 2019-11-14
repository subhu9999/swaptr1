import React, { Component } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export default class UnAuthDashboard extends Component {
  render() {
    const { openModal } = this.props;

    return (
      <div
        id="main-buttons-unauth"
        className="row w-100 hide-fixed-buttons justify-content-around bg-white"
      >
        <div className="btn btn-lg">
          <Link to={"/"}>
            <i className="fas fa-home fa-lg text-dark"></i>
          </Link>
        </div>

        <div className="btn btn-lg" onClick={() => openModal("LoginModal")}>
          <i className="far fa-comment-alt fa-lg text-dark "></i>
        </div>

        <div
          className="btn btn-lg bg-primary rounded-0"
          onClick={() => openModal("LoginModal")}
        >
          <i className=" fas fa-camera fa-lg text-white" />
        </div>

        <div className="btn btn-lg" onClick={() => openModal("LoginModal")}>
          <i className="fas fa-layer-group fa-lg text-dark"></i>
        </div>

        <div className="btn btn-lg" onClick={() => openModal("LoginModal")}>
          <i className="fas fa-user fa-lg text-dark"></i>
        </div>
      </div>
    );
  }
}
