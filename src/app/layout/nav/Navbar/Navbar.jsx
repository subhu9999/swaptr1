import React, { Component } from "react";
import "./Navbar.css";
import Search from "../../../../features/search/Search";
import { withRouter } from "react-router-dom";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { connect } from "react-redux";
import { openModal } from "../../../../features/modals/modalActions";
import { withFirebase, firebaseConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import {
  objectToArrayDesc,
  objectToArraySomeFalse
} from "../../../common/util/helpers";
import { setChatSeenTrue } from "../../../../features/user/userActions";
import { resetListing } from "../../../../features/listing/listingActions";
const actions = {
  openModal,
  setChatSeenTrue,
  resetListing
};

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  userChat:
    !isEmpty(state.firebase.data.user_chat) &&
    objectToArrayDesc(state.firebase.data.user_chat[state.firebase.auth.uid]),
  someFalse:
    !isEmpty(state.firebase.data.user_chat) &&
    objectToArraySomeFalse(
      state.firebase.data.user_chat[state.firebase.auth.uid]
    )
});

class Navbar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push("/");
  };
  render() {
    const {
      auth,
      profile,
      userChat,
      someFalse,
      setChatSeenTrue,
      cityValue
    } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <nav className="navbar navbar-expand-md navbar-light nav-background fixed-top ">
        <button
          type="button"
          className="navbar-toggler bg-light"
          data-toggle="collapse"
          data-target="#nav"
        >
          <span className="navbar-toggler-icon" />

          {someFalse && (
            // <span className="badge-toggler" />
            <span className="badge-toggler">
              <i className="fas fa-circle fa-lg text-danger" />
            </span>
          )}
        </button>
        <a href="/" className="navbar-brand mr-0 mr-md-2">
          <i className="fab fa-sellcast fa-2x text-warning" />
        </a>

        <Search cityValue={cityValue} />
        {authenticated ? (
          <SignedInMenu
            auth={auth}
            profile={profile}
            signOut={this.handleSignOut}
            someFalse={someFalse}
            setChatSeenTrue={setChatSeenTrue}
            userChat={userChat}
            resetListing={resetListing}
          />
        ) : (
          <SignedOutMenu
            signIn={this.handleSignIn}
            register={this.handleRegister}
          />
        )}
      </nav>
    );
  }
}

export default withRouter(
  compose(
    withFirebase,
    connect(
      mapState,
      actions
    ),
    firebaseConnect(props => [`user_chat/${props.auth.uid}`])
  )(Navbar)
);

// export default withRouter(
//   withFirebase(
//     connect(
//       mapState,
//       actions
//     )(Navbar)
//   )
// );
