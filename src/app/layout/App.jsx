import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";
import ListingDashboard from "../../features/listing/ListingDashboard/ListingDashboard";
import ListingForm from "../../features/listing/ListingForm/ListingForm";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import ListingDetailedPage from "../../features/listing/ListingDetailed/ListingDetailedPage";
import ModalManager from "../../features/modals/ModalManager";
import TestComponent from "../../features/testarea/TestComponent";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";

// TODO: Cap Firebase Data Query Usage
class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <div className=" container-fluid">
          <Switch>
            <Route path="/" exact component={ListingDashboard} />
            <Route path="/createListing" component={ListingForm} />
            <Route path="/settings" component={SettingsDashboard} />
            <Route path="/listing/:id" component={ListingDetailedPage} />
            <Route path="/manage/:id" component={ListingForm} />
            <Route path="/profile/:id" component={UserDetailedPage} />
            <Route path="/test" component={TestComponent} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
