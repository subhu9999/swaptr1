import React, { Component } from "react";
import { connect } from "react-redux";
import Listing from "../Listing/Listing";
import Banner from "../../../app/layout/Banner/Banner";
import Navbar from "../../../app/layout/nav/Navbar/Navbar";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const mapState = state => ({
  listings: state.listings,
  loading: state.async.loading
});

class ListingDashboard extends Component {
  state = {};
  render() {
    const { listings, loading } = this.props;

    return (
      <div>
        <Navbar />
        <Banner />
        {loading && <LoadingComponent />}
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
