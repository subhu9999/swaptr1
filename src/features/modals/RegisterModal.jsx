import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal } from "./modalActions";
import RegisterForm from "../auth/Register/RegisterForm";

const actions = {
  closeModal
};

class RegisterModal extends Component {
  render() {
    return (
      <div
        className="modal fade"
        id="MainModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="MainModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="MainModalTitle">
                Register To Swaptr
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
              <RegisterForm />
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

export default connect(
  null,
  actions
)(RegisterModal);
