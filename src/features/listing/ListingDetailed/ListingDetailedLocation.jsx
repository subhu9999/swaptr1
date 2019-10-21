import React from "react";
import format from "date-fns/format";

const ListingDetailedLocation = ({ listing }) => {
  return (
    <div>
      <div className="card mt-4">
        <div className="card-header font-weight-bold text-center">
          <i className="fa fa-map-marker-alt fa-lg ml-2 text-danger" />
          {/* TODO: show full location details listing.location */}
          <span className="text-secondary ml-1">{listing.city}</span>
        </div>
        <div className="card-body text-center">
          <span className="text-secondary mr-2 font-weight-bold">
            Posted On
          </span>
          <span className="text-muted">
            {format(listing.created, "MMM DD, YYYY")}
          </span>
        </div>
      </div>
      <span className="font-weight-bold">AD ID</span>{" "}
      <span className="text-uppercase text-muted">{listing.id}</span>
      <a href="/" className="text-muted mt-1 float-right">
        <i className="fas fa-exclamation-triangle mr-1 " />
        Report Ad
      </a>
      {/* <div className="blank-div" /> */}
    </div>
  );
};

export default ListingDetailedLocation;
