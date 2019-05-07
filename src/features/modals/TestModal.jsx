import React from "react";
import { closeModal } from "./modalActions";
import { connect } from "react-redux";

const actions = {
  closeModal
};
const TestModal = () => {
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
              Modal title
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
          <div className="modal-body">...</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
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
};

export default connect(
  null,
  actions
)(TestModal);
