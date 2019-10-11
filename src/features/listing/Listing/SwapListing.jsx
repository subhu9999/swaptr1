import React from "react";
import "./SwapListing.css";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const SwapListing = ({ listing }) => {
  console.log(listing);
  var title = "";
  if (listing.title.length > 14) {
    title = listing.title.substring(0, 14) + "...";
  } else {
    title = listing.title;
  }

  var city = "";
  if (listing.city.length > 14) {
    city = listing.city.substring(0, 14) + "...";
  } else {
    city = listing.city;
  }
  // let listingMainPhoto = `/assets/swaptr-listing.jpg`;
  // if (listing && listing.images) {
  // listingMainPhoto = listing.images[0].imageURL;
  // console.log(listing.images[0]);
  // }
  return (
    <div className="row border mt-1 p-1">
      {/* link to chat with data */}
      <Link to={`/listing/${listing.id}`}>
        <img
          src={listing.images[0].imageURL || `/assets/swaptr-listing.jpg`}
          alt="img"
          className="col-3 swap-item-img "
        />
        <span className="col-5 p-0 pl-1 swap-item-title text-capitalize">
          {title}
        </span>
        <button className="col-3 btn btn-info rounded-0 swap-listing-btn float-right">
          <i className="fas fa-exchange-alt fa-2x "></i>
        </button>
        
      </Link>
    </div>
  );
};

export default SwapListing;
