import React from "react";

const ListingDetailedLocation = ({ listing }) => {
  return (
    <div>
      <div className="card mt-4">
        <div className="card-header font-weight-bold">Posted In Location</div>
        <div className="card-body ">
          <i className="fa fa-map-marker fa-3x ml-4 text-danger" />
        </div>
      </div>
      <span className="font-weight-bold">AD ID</span> {listing.id}
      <a href="/" className="text-muted mt-1 float-right">
        <i className="fas fa-exclamation-triangle mr-1 " />
        Report Ad
      </a>
      <div className="blank-div" />
    </div>
  );
};

export default ListingDetailedLocation;
