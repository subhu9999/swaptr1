import React from "react";
import "./Listing.css";

const Listing = ({ listing }) => {
  var title = "";
  if (listing.title.length > 22) {
    title = listing.title.substring(0, 22) + "...";
  } else {
    title = listing.title;
  }
  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3">
      <div className=" listing">
        <img
          src={listing.listingPhotoUrl}
          alt="img"
          className="listing-img img-thumbnail"
        />
        <h6 className="ml-1 listing-title">{title}</h6>
        <a
          href="/"
          className="btn btn-sm btn-secondary btn-swap"
          style={{ marginLeft: "12%" }}
        >
          Swap This
        </a>

        <div className="ml-1 text-secondary text-uppercase text-location-date">
          Mumbai,Maharastra
          <span
            className="text-muted mr-1 display-none"
            style={{ float: "right" }}
          >
            MAR 19
          </span>
        </div>
      </div>
    </div>
  );
};

export default Listing;
