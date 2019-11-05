import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";

import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toastr } from "react-redux-toastr";

export default class ListingPostedShare extends Component {
  copyToClipboard = () => {
    toastr.success("Copied !", "Link copied to clipboard");
  };
  render() {
    const { listing, handleCloseModal } = this.props;
    let title;
    if (listing.title.length > 25) {
      title = listing.title.substring(0, 25) + "...";
    } else {
      title = listing.title;
    }
    const shareLink = `https://swaptr1.firebaseapp.com/listing/${listing.id}`;

    return (
      <div className="row mt-1 justify-content-center">
        {/* <span className="text-muted font-weight-bold mr-1 mt-1">Share</span> */}
        <WhatsappShareButton
          url={shareLink}
          title={`Hey guys! You can find my "${title}" absolutely for free on Swaptr! \n `}
          // children={<WhatsappIcon size={35} round={true} />}
          children={
            <i
              className="fab fa-whatsapp fa-3x text-success mr-3"
              onClick={() => handleCloseModal()}
            ></i>
          }
        />
        <FacebookShareButton
          url={shareLink}
          // quote={`Click Here if you would like to SWAP with my "${title}"`}
          quote={`Hey guys! You can find my "${title}" absolutely for free on Swaptr! \n `}
          children={
            <i
              className="fab fa-facebook-square fa-3x facebook-share mr-3"
              onClick={() => handleCloseModal()}
            ></i>
          }
        />
        <TwitterShareButton
          url={shareLink}
          children={
            <i
              className="fab fa-twitter fa-3x text-info mr-2"
              onClick={() => handleCloseModal()}
            ></i>
          }
          title={title}
        />
        {/* <CopyToClipboard text={shareLink} onCopy={() => this.copyToClipboard()}>
          <button type="button" className="btn btn-link btn-sm ">
            <i className="fas fa-link fa-lg text-dark mr-1 " />
            Copy Link
          </button>
        </CopyToClipboard> */}
      </div>
    );
  }
}
