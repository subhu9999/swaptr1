import React, { Component } from "react";
import { closeModal, openModal } from "./modalActions";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import SocialLogin from "../../features/auth/SocialLogin/SocialLogin";
import { socialLogin } from "../auth/authActions";
import { withRouter } from "react-router-dom";
const actions = {
  closeModal,
  openModal,
  socialLogin
};

class LoginModal extends Component {
  openEmail = () => {
    this.props.closeModal();
    this.props.openModal("EmailModal");
  };

  handleCloseModal = () => {
    // this.props.history.goBack();
    this.props.closeModal();
  };

  render() {
    const { socialLogin } = this.props;
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
            Login to swaptr
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center">
          <SocialLogin socialLogin={socialLogin} />

          <button
            className="btn btn-block btn-info rounded-0 mt-2 "
            onClick={() => this.openEmail()}
          >
            <i className="fas fa-envelope fa-lg mr-2" />
            <span className="text-uppercase  font-weight-bold">
              CONTINUE WITH EMAIL
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
  )(LoginModal)
);
