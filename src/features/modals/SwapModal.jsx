import React, { Component } from "react";
import { closeModal, openModal } from "./modalActions";
import { connect } from "react-redux";
import { Modal, Spinner } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
// import LoadingComponent from "../../app/layout/LoadingComponent";
// import Listing from "../listing/Listing/Listing";
import { getUserListings } from "../listing/listingActions";
import SwapListing from "../listing/Listing/SwapListing";
import "./SwapModal.css";
import { addUserChat, addChatComment } from "../user/userActions";

const mapState = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    requesting: state.firestore.status.requesting,
    userListings: state.listings,
    listingLoading: state.async.loading,
    currentListing: state.firestore.ordered.listings[0]
  };
};

const actions = {
  closeModal,
  openModal,
  getUserListings,
  addUserChat,
  addChatComment
};

class SwapModal extends Component {
  async componentDidMount() {
    let userUid;
    userUid = this.props.auth.uid;
    this.props.getUserListings(userUid);

    // const {currentListing } = this.props;
    // console.log(currentListing)
  }

  handleCloseModal = () => {
    // this.props.history.goBack();
    this.props.closeModal();
  };

  render() {
    const {
      auth,
      listingLoading,
      userListings,
      currentListing,
      addUserChat,
      addChatComment
    } = this.props;

    let listingMainImage;
    if (
      currentListing &&
      currentListing.images &&
      currentListing.images[0].imageURL
    ) {
      listingMainImage = currentListing.images[0].imageURL;
    }

    let chatDetails = {
      listingId: currentListing.id,
      listingTitle: currentListing.title,
      listingPhoto: listingMainImage || "/assets/swaptr-listing.jpg",
      receiverName: currentListing.sellerName,
      sellerPhoneNumber: currentListing.sellerPhoneNumber,
      receiverPic: currentListing.sellerProfilePic,
      receiverUid: currentListing.sellerUid
    };

    let listingsComponent;
    if (userListings && userListings.length === 0) {
      listingsComponent = (
        <div className="">
          <p className="lead">Post a Free Ad to Start Swaping !</p>
          <Link
            to={`/createListing`}
            className="btn btn-primary btn-block rounded-0"
            onClick={this.handleCloseModal}
          >
            Click Here To Post Ad
          </Link>
        </div>
      );
    } else {
      listingsComponent = userListings.map(listing => (
        <SwapListing
          key={listing.id}
          auth={auth}
          listing={listing}
          currentListing={currentListing}
          addUserChat={addUserChat}
          addChatComment={addChatComment}
          chatDetails={chatDetails}
          handleCloseModal={this.handleCloseModal}
        />
      ));
    }
    return (
      <Modal
        show={true}
        onHide={this.handleCloseModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {userListings && userListings.length === 0 ? (
              <div>No items available to swap</div>
            ) : (
              <div>Select Item To Swap</div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto swap-modal-body justify-content-center">
          {listingLoading ? (
            <div>
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="primary" />
            </div>
          ) : (
            listingsComponent
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(SwapModal)
);
