import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addUserChat } from "../../user/userActions";
import { connect } from "react-redux";
const actions = {
  addUserChat
};
class ListingDetailedSidebar extends Component {
  render() {
    const { listing, auth, openModal, addUserChat } = this.props;
    // console.log(auth.uid);

    let phoneNumber;
    if (listing.showNumber) {
      phoneNumber = listing.sellerPhoneNumber;
    } else {
      phoneNumber = "-----";
    }
    let listingMainImage;
    if (listing && listing.images && listing.images[0].imageURL) {
      listingMainImage = listing.images[0].imageURL;
    }
    console.log(listingMainImage);
    let chatOrEdit;
    let chatDetails = {
      listingId: listing.id,
      listingTitle: listing.title,
      listingPhoto: listingMainImage || "/assets/swaptr-listing.jpg",
      receiverName: listing.sellerName,
      sellerPhoneNumber: listing.sellerPhoneNumber,
      receiverPic: listing.sellerProfilePic,
      receiverUid: listing.sellerUid
    };
    if (auth.uid === listing.sellerUid) {
      chatOrEdit = (
        <Link
          to={`/manage/${listing.id}`}
          className="btn btn-primary font-weight-bold d-block mb-2 rounded-0"
        >
          Edit This Listing
        </Link>
      );
    } else {
      chatOrEdit = (
        <Link
          to={`/chats/${auth.uid}`}
          className="btn btn-primary text-uppercase font-weight-bold d-block mb-2 rounded-0"
          onClick={() => addUserChat(chatDetails)}
        >
          Chat With Seller
        </Link>
      );
    }

    return (
      <div>
        <div className="card ">
          <div className="card-header">Seller Details</div>
          <div className="card-body ">
            <Link to={`/profile/${listing.sellerUid}`} className="text-dark">
              <img
                className="img-fluid profile-pic float-left mr-2"
                src={listing.sellerProfilePic || "/assets/default-user.png"}
                alt="user_pic"
              />
              <span className=" font-weight-bold ">
                {listing.sellerName || "User"}
              </span>
              <i className="fas fa-angle-right fa-2x float-right mt-4" />
              <p>View Profile</p>

              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </Link>
          </div>
          <div className="card-footer text-muted ">
            {auth.isEmpty ? (
              <button
                className="btn btn-primary text-uppercase font-weight-bold btn-block mb-2 rounded-0"
                onClick={() => openModal("LoginModal")}
              >
                Chat With Seller
              </button>
            ) : (
              chatOrEdit
            )}
            <div className="container row justify-content-center">
              <i className="fas fa-mobile-alt fa-lg mr-2 h4 mt-3" />

              {auth.isEmpty ? (
                <span className="font-weight-bold h4 mr-2 mt-2">
                  *** **** ***
                  <button
                    className="btn btn-link"
                    onClick={() => openModal("LoginModal")}
                  >
                    <u className="text-primary">Show Number</u>
                  </button>
                </span>
              ) : (
                <span className="font-weight-bold h5 mr-2 mt-2">
                  {/* {listing.sellerPhoneNumber} */}
                  {phoneNumber}
                </span>
              )}
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
)(ListingDetailedSidebar);
