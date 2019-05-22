import React, { Component } from "react";
import { closeModal, openModal } from "./modalActions";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import LoginForm from "../../features/auth/Login/LoginForm";

const actions = {
  closeModal,
  openModal
};

class LoginModal extends Component {
  openRegister = () => {
    this.props.closeModal();
    this.props.openModal("RegisterModal");
  };
  openForgotPassword = () => {
    this.props.closeModal();
    this.props.openModal("ForgotPasswordModal");
  };
  render() {
    const { closeModal } = this.props;
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
            Login to swaptr
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm closeModal={closeModal} />
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button onClick={() => this.openRegister()}>
            Register if you are New User
          </Button>
        </Modal.Footer>
        <Modal.Footer className="justify-content-right">
          <Button onClick={() => this.openForgotPassword()} variant="link">
            forgot password
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  null,
  actions
)(LoginModal);
