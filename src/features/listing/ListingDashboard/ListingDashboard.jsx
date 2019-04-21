import React, { Component } from "react";
import { connect } from "react-redux";
import Listing from "../Listing/Listing";
import Banner from "../../../app/layout/Banner/Banner";
import Navbar from "../../../app/layout/nav/Navbar/Navbar";

const mapState = state => ({
  listings: state.listings
});

class ListingDashboard extends Component {
  state = {};
  render() {
    const { listings } = this.props;
    return (
      <div>
        <Navbar />
        <Banner />
        <div className="row  ml-auto mr-auto">
          {listings.map(listing => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapState)(ListingDashboard);
