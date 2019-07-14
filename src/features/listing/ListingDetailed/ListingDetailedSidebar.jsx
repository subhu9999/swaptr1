import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListingDetailedSidebar extends Component {
  render() {
    const { listing, auth, openModal } = this.props;
    let phoneNumber;
    if (listing.showNumber) {
      phoneNumber = listing.sellerPhoneNumber;
    } else {
      phoneNumber = "-----";
    }

    let chatOrEdit;
    if (auth.uid === listing.sellerUid) {
      chatOrEdit = (
        <a
          href="/"
          className="btn btn-primary font-weight-bold d-block mb-2 rounded-0"
        >
          Edit This Listing
        </a>
      );
    } else {
      chatOrEdit = (
        <a
          href="/"
          className="btn btn-primary text-uppercase font-weight-bold d-block mb-2 rounded-0"
        >
          Chat With Seller
        </a>
      );
    }

    return (
      <div>
        <div className="card ">
          <div className="card-header">Seller Details</div>
          <div className="card-body ">
            <Link to={`/profile/${listing.sellerUid}`} className="text-dark">
              <img
                className="img-fluid profile-pic float-left mr-2"
                src={listing.sellerProfilePic || "/assets/default-user.png"}
                alt="user_pic"
              />
              <span className=" font-weight-bold ">
                {listing.sellerName || "User"}
              </span>
              <i className="fas fa-angle-right fa-2x float-right mt-4" />
              <p>View Profile</p>

              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </Link>
          </div>
          <div className="card-footer text-muted ">
            {auth.isEmpty ? (
              <button
                className="btn btn-primary text-uppercase font-weight-bold btn-block mb-2 rounded-0"
                onClick={() => openModal("LoginModal")}
              >
                Chat With Seller
              </button>
            ) : (
              chatOrEdit
            )}
            <div className="container row justify-content-center">
              <i className="fas fa-mobile-alt fa-lg mr-2 h4 mt-3" />

              {auth.isEmpty ? (
                <span className="font-weight-bold h4 mr-2 mt-2">
                  *** **** ***
                  <button
                    className="btn btn-link"
                    onClick={() => openModal("LoginModal")}
                  >
                    <u className="text-primary">Show Number</u>
                  </button>
                </span>
              ) : (
                <span className="font-weight-bold h5 mr-2 mt-2">
                  {/* {listing.sellerPhoneNumber} */}
                  {phoneNumber}
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
