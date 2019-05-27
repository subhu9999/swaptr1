import React from "react";
import { closeModal } from "./modalActions";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import PhoneNumberForm from "../auth/PhoneNumber/PhoneNumberForm";

const actions = {
  closeModal
};
const PhoneNumberModal = ({ closeModal }) => {
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
          we need your phone number to verify account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PhoneNumberForm />
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={closeModal}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default connect(
  null,
  actions
)(PhoneNumberModal);
