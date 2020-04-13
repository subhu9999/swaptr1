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
import { Offline } from "react-detect-offline";
import OfflineModal from "../../features/modals/OfflineModal";
import UserOptions from "../../features/user/UserOptions/UserOptions";
import PrivacyPolicy from "../../features/terms/PrivacyPolicy";
import TermsOfService from "../../features/terms/TermsOfService";
// import RedirectToAsset from "../../features/.well-known/RedirectToAsset";
import Admin from "../../features/admin/Admin";
// TODO: Cap Firebase Data Query Usage
class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <Offline>
          <OfflineModal />
        </Offline>
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
            <Route path="/userOptions/:id" component={UserOptions} />
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

            <Route path="/termsOfService" component={TermsOfService} />
            <Route path="/privacyPolicy" component={PrivacyPolicy} />
            <Route
              path="/.well-known/assetlinks.json"
              component={() => {
                window.location.href = "https://swaptr1.firebaseio.com/assetlinks.json";
                return null;
              }}
              // component={RedirectToAsset}
            />
<Route path="/iamadmin" component={Admin} />

<Route path="/test" component={TestComponent} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
