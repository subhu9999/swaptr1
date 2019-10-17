import React, { Component } from "react";
import "./SwapListing.css";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { toastr } from "react-redux-toastr";

export default class SwapListing extends Component {
  handleSwap = async () => {
    const {
      listing,
      chatDetails,
      addUserChat,
      handleCloseModal,
      addChatComment
    } = this.props;
    //close swap modal
    handleCloseModal();
    //add user chat
    let userChat = await addUserChat(chatDetails);
    // console.log(userChat);
    //add swap item link in add chat comment
    const values = {
      comment: "i would like to swap this item. please check and reply !"
    };
    // console.log(userChat.id.length);
    await addChatComment(userChat, values, listing);

    //show confirmation toast
    toastr.success(
      "Swap Request Sent Successfully !",
      "please wait for reply !"
    );
  };

  render() {
    const {
      listing,
      currentListing,
      auth,
      addUserChat,
      chatDetails
    } = this.props;
    var title = "";
    if (listing.title.length > 10) {
      title = listing.title.substring(0, 10) + "...";
    } else {
      title = listing.title;
    }

    // var city = "";
    // if (listing.city.length > 14) {
    //   city = listing.city.substring(0, 14) + "...";
    // } else {
    //   city = listing.city;
    // }
    return (
      <div className="row border mt-1 p-1">
        {/* link to chat with data */}
        <div
          // to={`/chats/${auth.uid}`}
          // onClick={() => addUserChat(chatDetails)}
          onClick={() => this.handleSwap()}
        >
          <img
            src={listing.images[0].imageURL || `/assets/swaptr-listing.jpg`}
            alt="img"
            className="col-3 swap-item-img "
          />
          <span className="col-5 p-0 pl-1 swap-item-title text-capitalize text-primary">
            {title}
          </span>
          <button className="col-3 btn btn-info rounded-0 swap-listing-btn float-right">
            <i className="fas fa-exchange-alt fa-2x "></i>
          </button>
        </div>
      </div>
    );
  }
}
