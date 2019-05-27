import React, { Component } from "react";
import { closeModal, openModal } from "./modalActions";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import ForgotPassword from "../auth/ForgotPassword/ForgotPassword";

const actions = {
  closeModal,
  openModal
};

class ForgotPasswordModal extends Component {
  render() {
    const { closeModal } = this.props;
    return (
      <Modal
        show={true}
        onHide={closeModal}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Give us your email id
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ForgotPassword />
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect(
  null,
  actions
)(ForgotPasswordModal);
