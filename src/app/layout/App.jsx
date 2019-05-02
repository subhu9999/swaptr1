import React, { Component } from "react";

import { Route } from "react-router-dom";
import ListingDashboard from "../../features/listing/ListingDashboard/ListingDashboard";
import ListingForm from "../../features/listing/ListingForm/ListingForm";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import ListingDetailedPage from "../../features/listing/ListingDetailed/ListingDetailedPage";

class App extends Component {
  render() {
    return (
      <div className=" container-fluid">
        <Route path="/" exact component={ListingDashboard} />
        <Route path="/createListing" component={ListingForm} />
        <Route path="/settings" component={SettingsDashboard} />
        <Route path="/listing/:id" component={ListingDetailedPage} />
        <Route path="/manage/:id" component={ListingForm} />
      </div>
    );
  }
}

export default App;
