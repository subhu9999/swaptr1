import React from "react";
import { closeModal } from "./modalActions";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import RegisterForm from "../auth/Register/RegisterForm";

const actions = {
  closeModal
};
const RegisterModal = ({ closeModal }) => {
  return (
    <Modal
      show={true}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegisterForm />
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
)(RegisterModal);
