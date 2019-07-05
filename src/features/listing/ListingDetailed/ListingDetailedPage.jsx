import React, { Component } from "react";
import Navbar from "../../../app/layout/nav/Navbar/Navbar";
import "./ListingDetailedPage.css";
import { connect } from "react-redux";
import ListingDetailedPhotos from "./ListingDetailedPhotos.jsx";
import ListingDetailedSidebar from "./ListingDetailedSidebar";
import ListingDetailedLocation from "./ListingDetailedLocation";
import ListingDetailedBody from "./ListingDetailedBody";
import { openModal } from "../../modals/modalActions";
import { withFirestore } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";

const mapState = state => {
  // let listing = {};
  // if (
  //   state.firestore.ordered.listings &&
  //   state.firestore.ordered.listings[0] > 0
  // ) {
  //   // listing = state.listings.filter(listing => listing.id === listingId)[0];
  //   listing = state.firestore.ordered.listings[0];
  // }

  return {
    // listing,
    auth: state.firebase.auth
  };
};

const actions = {
  openModal
};

class ListingDetailedPage extends Component {
  state = {
    listing: {}
  };
  async componentDidMount() {
    const { firestore, match, history } = this.props;
    let listing_id = match.params.id;
    let listing = await firestore.get(`listings/${match.params.id}`);
    if (!listing.exists) {
      history.push("/");
      toastr.error("Sorry", "No listing found");
    }
    // console.log(listing.data());
    listing = listing.data();
    this.setState({
      listing: {
        id: listing_id,
        ...listing
      }
    });
  }

  render() {
    const { auth, openModal } = this.props;
    const { listing } = this.state;
    return (
      <div>
        <Navbar />
        <div className="row listing-detailed listing-detailed-margin">
          <div className="col-md-8 col-xs-12">
            <ListingDetailedPhotos listing={listing} />
            <ListingDetailedBody listing={listing} auth={auth} />
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

export default withFirestore(
  connect(
    mapState,
    actions
  )(ListingDetailedPage)
);
