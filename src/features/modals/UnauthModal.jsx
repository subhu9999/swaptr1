import React, { Component } from "react";
// import {Modal, Button, Divider} from 'semantic-ui-react';
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closeModal, openModal } from "../modals/modalActions";

const actions = { closeModal, openModal };

class UnauthModal extends Component {
  handleCloseModal = () => {
    this.props.history.goBack();
    this.props.closeModal();
  };
  render() {
    const { openModal } = this.props;
    return (
      <Modal size="sm" show={true} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          You need to be signed in to do that!
        </Modal.Header>
        <Modal.Body>
          <p>Please either login or register to see this page</p>
          <Button
            className="btn btn-block btn-primary rounded-0"
            onClick={() => openModal("LoginModal")}
          >
            Login
          </Button>

          <Button
            className="btn btn-block btn-primary rounded-0"
            onClick={() => openModal("RegisterModal")}
          >
            Register
          </Button>
          <div className="mt-4" style={{ textAlign: "center" }}>
            <p>OR</p>
            <p> Click Here To Browse HomePage</p>
            <Button
              className="btn btn-block btn-primary rounded-0"
              onClick={this.handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(UnauthModal)
);
