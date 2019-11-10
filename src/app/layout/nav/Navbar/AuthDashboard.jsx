import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default class AuthDashboard extends Component {
  render() {
    const someFalse = true;
    const { auth } = this.props;
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
        <div className="btn btn-lg">
          <Link to={`/chats/${auth.uid}`}>
            <i className="far fa-comment-alt fa-lg text-dark "></i>
            {someFalse && (
              <span className="dashboard-badge">
                <i className="fas fa-circle fa-lg" />
              </span>
            )}
          </Link>
        </div>

        <div className="btn btn-lg bg-primary rounded-0">
          <Link to={"/createListing"}>
            <i className=" fas fa-camera fa-lg text-white" />
          </Link>
        </div>

        <div className="btn btn-lg">
          <Link to={`/profile/${auth.uid}`}>
            <i className="fas fa-layer-group fa-lg text-dark"></i>
          </Link>
        </div>

        <div className="btn btn-lg">
          <Link to={"/settings"}>
            <i className="fas fa-user fa-lg text-dark"></i>
          </Link>
        </div>
      </div>
    );
  }
}
