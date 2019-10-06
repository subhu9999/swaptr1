import React, { Component } from "react";
import { closeModal, openModal } from "./modalActions";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
const actions = {
  closeModal,
  openModal
};

class OfflineModal extends Component {
  handleCloseModal = () => {
    // this.props.history.goBack();
    // this.props.closeModal();
  };

  reloadPage = () => {
    window.location.reload();
  };

  render() {
    return (
      <Modal
        show={true}
        onHide={this.handleCloseModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            No Internet connection. Check Wi-Fi / Mobile Data is turned on, then
            try again.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center">
          <button
            className="btn btn-block btn-info rounded-0 mt-2 "
            onClick={() => this.reloadPage()}
          >
            <span className="text-uppercase  font-weight-bold">
              Reload Page
            </span>
          </button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(OfflineModal)
);
