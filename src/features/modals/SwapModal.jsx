import React, { Component } from "react";
import { closeModal, openModal } from "./modalActions";
import { connect } from "react-redux";
import { Modal, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import LoadingComponent from "../../app/layout/LoadingComponent";
import Listing from "../listing/Listing/Listing";
import { getUserListings } from "../listing/listingActions";

const mapState = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    requesting: state.firestore.status.requesting,
    userListings: state.listings,
    listingLoading: state.async.loading
  };
};

const actions = {
  closeModal,
  openModal,
  getUserListings
};

class SwapModal extends Component {
  componentDidMount = () => {
    let userUid;
    userUid = this.props.auth.uid;
    this.props.getUserListings(userUid);
  };

  handleCloseModal = () => {
    // this.props.history.goBack();
    this.props.closeModal();
  };

  render() {
    const { requesting, listingLoading, userListings, auth } = this.props;

    let listingsComponent;
    if (userListings && userListings.length === 0) {
      listingsComponent = (
        <div className="">
          <p className="lead">Post a Free Ad to Start Swaping !</p>
          <button className="btn btn-primary btn-block rounded-0">
            Click Here To Post Ad
          </button>
        </div>
      );
    } else {
      listingsComponent = userListings.map(listing => (
        <Listing key={listing.id} listing={listing} />
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
        <Modal.Body className="justify-content-center">
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
