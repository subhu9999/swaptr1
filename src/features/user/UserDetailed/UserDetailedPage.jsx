import React, { Component } from "react";
import Navbar from "../../../app/layout/nav/Navbar/Navbar";
import "./UserDetailedPage.css";
import UserDetailedHeader from "./UserDetailedHeader";
import Listing from "../../listing/Listing/Listing";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { userDetailedQuery } from "../userQueries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getUserListings, resetListing } from "../../listing/listingActions";
import { Spinner } from "react-bootstrap";
// import LazyLoad from 'react-lazyload';

//TODO: add infinite scroller
const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};
  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    requesting: state.firestore.status.requesting,
    userListings: state.listings,
    listingLoading: state.async.loading
  };
};

const actions = {
  getUserListings,
  resetListing
};

//TODO: change the query doc in firebase
class UserDetailedPage extends Component {
  componentDidMount = () => {
    let userUid;
    userUid = this.props.match.params.id;
    this.props.getUserListings(userUid);
  };

  componentWillUpdate = () => {
    const { userListings, match } = this.props;
    // const demoListing = userListings[0];
    console.log("will update");
    if (
      userListings &&
      userListings[0] &&
      userListings[0].sellerUid !== match.params.id
    ) {
      let userUid;
      userUid = this.props.match.params.id;
      this.props.getUserListings(userUid);
      console.log("get request");
    }
  };

  render() {
    const { profile, requesting, listingLoading, userListings } = this.props;
    let loadingComponent;
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) {
      loadingComponent = (
        <div className="user-detailed-margin">
          <LoadingComponent />
        </div>
      );
    } else {
      loadingComponent = "";
    }

    return (
      <div>
        <Navbar />
        {loading ? (
          loadingComponent
        ) : (
          <div>
            <UserDetailedHeader userProfile={profile} />
          </div>
        )}
        <div className="row  ml-auto mr-auto">
          {listingLoading ? (
            <div>
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="primary" />
            </div>
          ) : (
            userListings.map(listing => (
              <Listing key={listing.id} listing={listing} />
            ))
          )}
        </div>
      </div>
    );
  }
}
export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);
