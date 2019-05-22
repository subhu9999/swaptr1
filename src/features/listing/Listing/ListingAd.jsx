import React from "react";
import "./Listing.css";
import { Card, Button } from "react-bootstrap";

export default function ListingAd() {
  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3 ">
      <div className=" listing">
        <Card className="text-center text-light listing-ad-background rounded-0">
          {/* <Card.Header>Featured</Card.Header> */}
          <Card.Body>
            <Card.Title>Want to see your extra stuff here?</Card.Title>
            <Card.Text className="hide-sm">
              Post your free ad in less than a minute
            </Card.Text>
            <Button className="listing-ad-btn mb-3 rounded-0">
              <span className="font-weight-bold">Go Swaptr</span>
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
