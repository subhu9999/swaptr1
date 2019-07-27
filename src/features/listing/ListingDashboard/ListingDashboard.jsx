import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Listing from "../Listing/Listing";
import Banner from "../../../app/layout/Banner/Banner";
import Navbar from "../../../app/layout/nav/Navbar/Navbar";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ListingAd from "../../listing/Listing/ListingAd";
import { getListingsForDashboard } from "../../listing/listingActions";
import { Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";

const mapState = state => ({
  listings: state.listings,
  // listings: state.firestore.ordered.listings,
  loading: state.async.loading
});

const actions = {
  getListingsForDashboard
};

class ListingDashboard extends Component {
  state = {
    moreListings: false,
    loadingInitial: true,
    loadedListings: []
  };

  async componentDidMount() {
    let next = await this.props.getListingsForDashboard();
    // console.log(next);
    if (next && next.docs.length > 1) {
      this.setState({
        moreListings: true,
        loadingInitial: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listings !== nextProps.listings) {
      this.setState({
        loadedListings: [...this.state.loadedListings, ...nextProps.listings]
      });
    }
  }

  getNextListings = async () => {
    const { listings } = this.props;
    let lastListing = listings && listings[listings.length - 1];
    // console.log(lastListing);
    let next = await this.props.getListingsForDashboard(lastListing);
    // console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreListings: false
      });
    }
  };

  render() {
    const { loading } = this.props;
    const { loadingInitial, loadedListings, moreListings } = this.state;
    let loadingComponent;
    if (loadingInitial) {
      loadingComponent = (
        <div className="col-6 col-sm-6 col-md-4 col-lg-3">
          <LoadingComponent />
        </div>
      );
    } else {
      loadingComponent = "";
    }
    return (
      <div>
        <Navbar />
        <Banner />

        <InfiniteScroll
          pageStart={0}
          loadMore={this.getNextListings}
          hasMore={!loading && moreListings}
          initialLoad={false}
        >
          <div className="row  ml-auto mr-auto">
            <ListingAd />
            {loadingComponent}
            {loadedListings &&
              loadedListings.length !== 0 &&
              loadedListings.map(listing => (
                <Listing key={listing.id} listing={listing} />
              ))}
          </div>
        </InfiniteScroll>

        {/* //TODO: Add FB type loading */}
        {loading && (
          <div>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="primary" />
          </div>
        )}
      </div>
    );
  }
}

// export default connect(
//   mapState,
//   actions
// )(firestoreConnect([{ collection: "listings" }])(ListingDashboard));

export default connect(
  mapState,
  actions
)(ListingDashboard);
