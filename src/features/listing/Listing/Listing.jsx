import React from "react";
import "./Listing.css";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const Listing = ({ listing }) => {
  var title = "";
  if (listing.title.length > 20) {
    title = listing.title.substring(0, 20) + "...";
  } else {
    title = listing.title;
  }
  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3">
      <div className=" listing">
        <Link to={`/listing/${listing.id}`}>
          <img
            src={listing.listingMainPhoto}
            alt="img"
            className="listing-img img-thumbnail"
          />
          <h6 className="ml-1 listing-title">{title}</h6>

          <div className="ml-1 text-secondary text-uppercase text-location-date">
            {listing.city}
            <span
              className="text-muted mr-1 display-none"
              style={{ float: "right" }}
            >
              {format(listing.date, "MMM DD")}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Listing;
