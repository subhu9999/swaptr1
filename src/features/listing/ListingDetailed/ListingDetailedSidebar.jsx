import React from "react";

export default function ListingDetailedSidebar({ listing }) {
  return (
    <div>
      <div className="card ">
        <div className="card-header">Seller Details</div>
        <div className="card-body ">
          <a href="/" className="text-dark">
            <img
              className="img-fluid profile-pic float-left mr-2"
              src={listing.user.profilePic}
              alt="user_pic"
            />
            <span className=" font-weight-bold ">{listing.user.name}</span>
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
            <i className="fas fa-mobile-alt fa-lg mr-2 h4 mt-2" />
            <span className="font-weight-bold h4 mr-2 mt-1">*** **** ***</span>
            <span className="text-underline mt-1">
              <a href="/">
                <u>Show Number</u>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
