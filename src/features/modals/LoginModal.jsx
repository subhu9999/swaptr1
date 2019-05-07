import React, { Component } from "react";
import LoginForm from "../auth/Login/LoginForm";
// import { connect } from "react-redux";
// import { closeModal, openModal } from "./modalActions";

// const actions = {
//   closeModal,
//   openModal
// };

class LoginModal extends Component {
  render() {
    return (
      <div
        className="modal fade modal-background"
        id="loginModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="loginModalTitle"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalTitle">
                Login To Swaptr
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <LoginForm />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.props.closeModal}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginModal;
