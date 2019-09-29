import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";
import ListingDashboard from "../../features/listing/ListingDashboard/ListingDashboard";
import ListingForm from "../../features/listing/ListingForm/ListingForm";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import ListingDetailedPage from "../../features/listing/ListingDetailed/ListingDetailedPage";
import ModalManager from "../../features/modals/ModalManager";
import TestComponent from "../../features/testarea/TestComponent";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import UserChatsPage from "../../features/user/UserChatsPage/UserChatsPage";
import UserChatFormMobile from "../../features/user/UserChatsPage/UserChatFormMobile";
import SearchResultPage from "../../features/search/SearchResultPage";
import AlgoliaListings from "../../features/algolia/AlgoliaListings";
import { UserIsAuthenticated } from "../../features/auth/authWrapper";
// TODO: Cap Firebase Data Query Usage
class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <div className=" container-fluid">
          <Switch>
            <Route path="/" exact component={ListingDashboard} />

            <Route
              path="/createListing"
              component={UserIsAuthenticated(ListingForm)}
            />
            <Route
              path="/settings"
              component={UserIsAuthenticated(SettingsDashboard)}
            />
            <Route path="/listing/:id" component={ListingDetailedPage} />

            <Route
              path="/manage/:id"
              component={UserIsAuthenticated(ListingForm)}
            />

            <Route path="/profile/:id" component={UserDetailedPage} />
            {/* TODO: Hide Route */}
            <Route
              path="/chats/sm/:chatId"
              component={UserIsAuthenticated(UserChatFormMobile)}
            />

            <Route
              path="/chats/:userId"
              component={UserIsAuthenticated(UserChatsPage)}
            />

            <Route path="/search/:id" component={SearchResultPage} />

            <Route
              path="/firestoreListingForAlgolia"
              component={AlgoliaListings}
            />

            <Route path="/test" component={TestComponent} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
