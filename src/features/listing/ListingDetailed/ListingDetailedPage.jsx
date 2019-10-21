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
import LoadingComponent from "../../../app/layout/LoadingComponent";
import Skeleton from "react-loading-skeleton";
import ListingNearby from "../ListingDashboard/ListingNearby";
import SearchResultPage from "../../search/SearchResultPage";
import { addUserChat } from "../../user/userActions";

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
  openModal,
  addUserChat
};
//add more related listing at bottom
class ListingDetailedPage extends Component {
  state = {
    listing: {},
    loading: false
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

    //check if listing are loaded if not reload page
    // const { listingState } = this.state;
    // window.setTimeout(function() {
    //   if (listingState.title && listingState.title.length === 0) {
    //     console.log("00000");
    //     // window.location.reload();
    //   }
    // }, 9000);
  }

  componentWillReceiveProps = async nextProps => {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      // window.location.reload();
      this.setState({
        loading: true
      });

      const { firestore, match, history } = nextProps;
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

      this.setState({
        loading: false
      });
    }
  };

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  render() {
    const { auth, openModal, addUserChat } = this.props;
    const { isEmpty } = this;
    const { listing, loading } = this.state;
    // console.log(listing);
    let listingRender;
    if (isEmpty(listing) || loading) {
      // Object is empty ()
      // console.log("empty");
      listingRender = (
        <div className="listing-detailed-margin">
          {/* <LoadingComponent /> */}
          <div className="row">
            <div className="col-md-8">
              <Skeleton height="400px" />
            </div>
            <div className="col-md-4">
              <Skeleton height="400px" />
            </div>
          </div>
          <div className="row">
            <Skeleton height="100px" />
          </div>
        </div>
      );
    } else {
      // Object is NOT empty
      // console.log("listing ready");

      listingRender = (
        <div className="row listing-detailed listing-detailed-margin">
          <div className="col-md-8 col-xs-12">
            <ListingDetailedPhotos listing={listing} />
            <ListingDetailedBody
              listing={listing}
              auth={auth}
              addUserChat={addUserChat}
              openModal={openModal}
            />
          </div>
          <div className="col-md-4 col-xs-12">
            <ListingDetailedSidebar
              listing={listing}
              auth={auth}
              openModal={openModal}
              addUserChat={addUserChat}
            />
            <ListingDetailedLocation listing={listing} />
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        {listingRender}
        {/* algolia listings with search listing.filter city */}
        {listing && listing.filterCity && (
          <ListingNearby filterCity={listing.filterCity} />
        )}
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
