import React, { Component } from "react";
import { closeModal } from "./modalActions";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ListingPostedShare from "../listing/Listing/ListingPostedShare";
import "./ShareModal.css";
const actions = {
  closeModal
};

const mapState = state => {
  return {
    id: state.modals.modalProps.id,
    listingImage: state.modals.modalProps.listingImage,
    title: state.modals.modalProps.title
  };
};
class ShareModal extends Component {
  openEmail = () => {
    this.props.closeModal();
    this.props.openModal("EmailModal");
  };

  handleCloseModal = () => {
    // this.props.history.goBack();
    this.props.closeModal();
  };

  render() {
    const { id, listingImage, title } = this.props;
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
            <i className="fas fa-check-circle ml-1 text-success fa-2x float-left mr-2"></i>
            <span className="mt-1">Successfully Posted </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center">
          <span className="lead">Share Your Ad To Get More Views !</span>
          <div className="text-center">
            <img
              src={listingImage}
              alt=""
              className="img-thumbnail share-img rounded"
            />
            <p className="lead font-italic">{title}</p>
          </div>
          <ListingPostedShare
            listing={{ id: id, title: title }}
            handleCloseModal={this.handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(ShareModal)
);
