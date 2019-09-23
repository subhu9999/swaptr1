import React from "react";
import "./Listing.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ListingAdSearch() {
  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3 ">
      <div className=" listing">
        <Card className="text-center text-light listing-ad-background rounded-0">
          {/* <Card.Header>Featured</Card.Header> */}
          <Card.Body>
            <Card.Title>Post a New Ad To Get Responses Near You</Card.Title>
            <Card.Text className="hide-sm">
              {/* Post your free ad in less than a minute */}
            </Card.Text>
            <Link
              to="/createListing"
              className="btn listing-ad-btn mb-3 rounded-0"
            >
              <span className="font-weight-bold text-white">Post Free Ad</span>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
