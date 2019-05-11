import React, { Component } from "react";
import LoginModal from "../../../features/modals/LoginModal";

class ListingDetailedSidebar extends Component {
  render() {
    const { listing, auth } = this.props;

    return (
      <div>
        <div className="card ">
          <div className="card-header">Seller Details</div>
          <div className="card-body ">
            <a href="/" className="text-dark">
              <img
                className="img-fluid profile-pic float-left mr-2"
                src={listing.profilePic || "/assets/default-user.png"}
                alt="user_pic"
              />
              <span className=" font-weight-bold ">{listing.userName}</span>
              <i className="fas fa-angle-right fa-2x float-right mt-4" />
              <p>View Profile</p>

              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </a>
          </div>
          <div className="card-footer text-muted">
            <a
              href="/"
              className="btn btn-primary text-uppercase font-weight-bold d-block mb-2 rounded-0"
            >
              Chat With Seller
            </a>
            <div className="container row justify-content-center">
              <i className="fas fa-mobile-alt fa-lg mr-2 h4 mt-3" />

              {auth.authenticated ? (
                <span className="font-weight-bold h5 mr-2 mt-2">
                  {listing.phoneNumber}
                </span>
              ) : (
                <span className="font-weight-bold h4 mr-2 mt-2">
                  *** **** ***
                  <button
                    className="btn"
                    data-toggle="modal"
                    data-target="#loginModal"
                  >
                    <u className="text-secondary">Show Number</u>
                  </button>
                  <LoginModal />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ListingDetailedSidebar;
