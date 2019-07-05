import React, { Component } from "react";
import { closeModal } from "./modalActions";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
// import axios from "axios";
import { deleteImage, resetListing } from "../listing/listingActions";
import { withRouter } from "react-router-dom";

const mapState = state => ({
  images: state.modals.modalProps
});

const actions = {
  closeModal,
  deleteImage,
  resetListing
};

// const REACT_APP_CLOUDINARY_API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;

class cancelListingModal extends Component {
  deleteFromFirebase = image => {
    //delete from firebase
    // console.log(image);
    this.props.deleteImage(image);
  };

  // deleteFromServer = deleteToken => {
  // toastr.success("deleted", "1 photo deleted !");
  // console.log(deleteToken);
  //delete selected image from files
  // Initial FormData
  // const formData = new FormData();
  // formData.append("upload_preset", "v8yxkbjj"); // Replace the preset name with your own
  // formData.append("api_key", REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
  // formData.append("token", deleteToken);
  // formData.append("q_auto", "c_scale", "w_300");

  // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
  // return axios
  // .post(
  // "https://api.cloudinary.com/v1_1/dayoe8mly/delete_by_token",
  //       formData,
  //       {
  //         headers: { "X-Requested-With": "XMLHttpRequest" }
  //       }
  //     )

  //     .then(response => {
  //       // console.log(response);
  //       //remove the deleted image from images array using token
  //       console.log(response);
  //     });
  // };

  // deleteImages = async () => {
  //   // console.log(this.props.deleteTokens[0]);
  //   if (this.props.deleteTokens[0] === undefined) {
  //     this.props.closeModal();
  //     this.props.history.push("/");

  //     return;
  //   }
  //   const deleteTokens = this.props.deleteTokens;
  //   deleteTokens.forEach(async deleteToken => {
  //     try {
  //       await this.deleteFromServer(deleteToken); // write your own logic
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  //   this.props.closeModal();
  //   this.props.history.push("/");
  // };

  deleteImages = async () => {
    // console.log(this.props.deleteTokens[0]);
    //check if no
    if (this.props.images[0] === undefined) {
      this.props.closeModal();
      this.props.resetListing();
      this.props.history.push("/");

      return;
    }
    const images = this.props.images;
    // console.log(imageNames);
    images.forEach(async image => {
      try {
        await this.deleteFromFirebase(image); // write your own logic
      } catch (error) {
        console.log(error);
      }
    });
    this.props.closeModal();
    this.props.resetListing();
    this.props.history.push("/");
  };

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
            Do You Want to CANCEL Posting ?
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body /> */}
        <Modal.Footer className="justify-content-center">
          <Button
            className="btn rounded-0"
            onClick={() => this.deleteImages()}
            variant="danger"
          >
            Cancel Listing
          </Button>
          <Button className="btn  rounded-0" onClick={() => closeModal()}>
            No, I want to post
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  mapState,
  actions
)(withRouter(cancelListingModal));
