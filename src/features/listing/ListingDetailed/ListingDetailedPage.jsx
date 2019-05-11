import React, { Component } from "react";
import Navbar from "../../../app/layout/nav/Navbar/Navbar";
import "./ListingDetailedPage.css";
import { connect } from "react-redux";
import ListingDetailedPhotos from "./ListingDetailedPhotos.jsx";
import ListingDetailedSidebar from "./ListingDetailedSidebar";
import ListingDetailedLocation from "./ListingDetailedLocation";
import ListingDetailedBody from "./ListingDetailedBody";
import { openModal } from "../../modals/modalActions";

const mapState = (state, ownProps) => {
  const listingId = ownProps.match.params.id;

  let listing = {};

  if (listingId && state.listings.length > 0) {
    listing = state.listings.filter(listing => listing.id === listingId)[0];
  }

  return {
    listing,
    auth: state.auth
  };
};

const actions = {
  openModal
};

class ListingDetailedPage extends Component {
  render() {
    const { listing, auth, openModal } = this.props;

    return (
      <div>
        <Navbar />
        <div className="row listing-detailed listing-detailed-margin">
          <div className="col-md-8 col-xs-12">
            <ListingDetailedPhotos listing={listing} />
            <ListingDetailedBody listing={listing} />
          </div>
          <div className="col-md-4 col-xs-12">
            <ListingDetailedSidebar
              listing={listing}
              auth={auth}
              openModal={openModal}
            />
            <ListingDetailedLocation listing={listing} />
            {/* To Do : add Nearby Location ads Recommendations */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(ListingDetailedPage);
