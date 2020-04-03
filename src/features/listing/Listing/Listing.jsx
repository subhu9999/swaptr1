import React,{useState} from "react";
import "./Listing.css";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const Listing = ({ listing }) => {
  const [error,setError] =useState(false);
  const [src,setSrc] = useState(listing.images[0].imageURL);

  const onError = () => {
    if (!error) {
      setSrc(`/assets/swaptr-listing.jpg`);
      setError(true);
    
    }
  }

  var title = "";
  if (listing.title.length > 20) {
    title = listing.title.substring(0, 20) + "...";
  } else {
    title = listing.title;
  }

  var city = "";
  if (listing.city.length > 20) {
    city = listing.city.substring(0, 20) + "...";
  } else {
    city = listing.city;
  }
  // let listingMainPhoto = `/assets/swaptr-listing.jpg`;
  // if (listing && listing.images) {
  // listingMainPhoto = listing.images[0].imageURL;
  // console.log(listing.images[0]);
  // }
  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3">
      <div className=" listing">
        <Link to={`/listing/${listing.id}`}>
          <img
            src={src}
            alt="img"
            className="listing-img img-thumbnail"
            onError={onError}
          />
          <h6 className="ml-1 listing-title">{title}</h6>

          <div className="ml-1 text-secondary text-uppercase text-location-date">
            {city}
            <span
              className="text-muted mr-1 display-none"
              style={{ float: "right" }}
            >
              {format(listing.created, "MMM DD")}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Listing;
