import React, { Component } from "react";
import "./Dashboard.css";

export default class UnAuthDashboard extends Component {
  render() {
    const { openModal } = this.props;

    return (
      <div
        id="main-buttons-unauth"
        className="row w-100 hide-fixed-buttons justify-content-around"
      >
        <div className="btn btn-lg" onClick={() => this.goHome()}>
          <i className="fas fa-home fa-lg text-dark"></i>
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
