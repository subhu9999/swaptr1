import React, { Component } from "react";
import { connect } from "react-redux";
// import { firestoreConnect } from "react-redux-firebase";
import { getListingsForAlgolia } from "../../features/listing/listingActions";

const actions = {
  getListingsForAlgolia
};

class AlgoliaListings extends Component {
  state = {
    listings: []
  };

  async componentDidMount() {
    let listings = await this.props.getListingsForAlgolia();
    console.log(listings);
    if (listings && listings.length > 1) {
      this.setState({
        listings: listings
      });
    }
  }

  render() {
    const { listings } = this.state;
    return <div>{JSON.stringify(listings)}</div>;
  }
}

export default connect(
  null,
  actions
)(AlgoliaListings);
