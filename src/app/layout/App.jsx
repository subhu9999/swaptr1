import React, { Component } from "react";

import { Route } from "react-router-dom";
import ListingDashboard from "../../features/listing/ListingDashboard/ListingDashboard";
import ListingForm from "../../features/listing/ListingForm/ListingForm";

class App extends Component {
  render() {
    return (
      <div className=" container">
        <Route path="/" exact component={ListingDashboard} />
        <Route path="/createListing" component={ListingForm} />
      </div>
    );
  }
}

export default App;
