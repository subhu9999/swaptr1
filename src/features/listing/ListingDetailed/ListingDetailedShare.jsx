import {
  WhatsappShareButton,
  FacebookShareButton,
  WhatsappIcon,
  FacebookIcon
} from "react-share";

import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toastr } from "react-redux-toastr";

export default class ListingDetailedShare extends Component {
  copyToClipboard = () => {
    toastr.success("Copied !", "Link copied to clipboard");
  };
  render() {
    const { listing } = this.props;

    const shareLink = `https://swaptr1.firebaseapp.com/listing/${listing.id}`;

    return (
      <div className="row mt-1 ml-auto mr-auto">
        {/* <div className="col-2 col-md-1 mt-1"> */}
        <span className="text-muted font-weight-bold mr-1 mt-1">Share</span>
        {/* </div> */}
        {/* <a
            className="btn ml-2 mr-1 p-0"
            href={`whatsapp://send?text=Hey guys! You can find my "${listing.title}" absolutely for free on Swaptr.com! \n ${shareLink}`}
          >
            <i className="fab fa-whatsapp fa-2x text-success"></i>
          </a> */}

        {/* <a
            className="btn ml-2 mr-1 p-0"
            href={`https://www.facebook.com/sharer/sharer.php?u=here is my text \n ${shareLink}`}
          >
            <i className="fab fa-facebook-square fa-2x facebook-share"></i>
          </a> */}
        {/* <div className="col-1 whatsapp-share mr-1"> */}
        <WhatsappShareButton
          url={shareLink}
          title={`Hey guys! You can find my "${listing.title}" absolutely for free on Swaptr.com! \n `}
          // children={<WhatsappIcon size={35} round={true} />}
          children={
            <i className="fab fa-whatsapp fa-2x text-success ml-1 mr-1"></i>
          }
        />
        {/* </div> */}
        {/* <div className="col-1 whatsapp-share"> */}
        <FacebookShareButton
          url={`https://swaptr1.firebaseapp.com/listing/${listing.id}`}
          quote={`image Would you like to Swap with this item ?`}
          children={
            <i className="fab fa-facebook-square fa-2x facebook-share ml-1 mr-1"></i>
          }
        />
        {/* </div> */}
        {/* <div className="col-1"> */}
        <CopyToClipboard text={shareLink} onCopy={() => this.copyToClipboard()}>
          <i className="fas fa-link fa-2x text-secondary ml-1 mr-1 p-0" />
        </CopyToClipboard>

        {/* </div> */}

        {/* <div className="col-7"></div> */}
        {/* <a className="btn ml-1 mr-1 p-2" href="/">
            <i className="fas fa-link fa-2x text-secondary" />
          </a> */}
        {/* <FacebookShareButton
            url={`https://swaptr1.firebaseapp.com/listing/${listing.id}`}
            quote={`image Would you like to Swap with this item ?`}
            children={<FacebookIcon size={35} round={true} />}
          /> */}
      </div>
    );
  }
}
