import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { closeModal } from "./modalActions";

const mapState = state => ({
  modal: state.modals
});

const actions = {
  closeModal
};

const ResetLinkSuccessModal = ({ closeModal, modal }) => {
  // console.log(modal.modalProps);
  return (
    <Modal
      show={true}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <i className="fas fa-check-square mr-2 text-success" />
          Check your email
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        We've sent an email to
        {modal && modal.modalProps && (
          <span className="ml-2 lead">{modal.modalProps.email}</span>
        )}
        . Click the link in the email to reset your password.
        <p className="mt-2">
          If you dont see the email,Check other places it might be like your
          junk,spam,social, or other folders
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default connect(
  mapState,
  actions
)(ResetLinkSuccessModal);
