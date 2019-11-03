import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

class ListingDetailedBody extends Component {
  componentDidMount = () => {};
  render() {
    const { listing, auth, addUserChat, openModal } = this.props;
    let listingMainImage;
    if (listing && listing.images && listing.images[0].imageURL) {
      listingMainImage = listing.images[0].imageURL;
    }
    // console.log(listingMainImage);

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
        <div id="action-buttons" className="w-100 hide-fixed-buttons">
          <a
            href="/"
            className="btn btn-lg btn-primary chat-button-fixed font-weight-bold w-100"
          >
            <i className="far fa-comment-alt  mr-1" />
            Edit Listing
          </a>
        </div>
      );
    } else {
      chatOrEdit = (
        <div id="action-buttons" className="w-100 hide-fixed-buttons">
          <Link
            to={`/chats/${auth.uid}`}
            className="btn btn-lg btn-primary chat-button-fixed font-weight-bold w-50"
            onClick={() => addUserChat(chatDetails)}
          >
            <i className="far fa-comment-alt  mr-1" />
            CHAT
          </Link>
          <a
            href={`tel:${listing.sellerPhoneNumber}`}
            className="btn btn-lg btn-primary call-button-fixed font-weight-bold w-50"
          >
            <i className="fas fa-phone mr-1 fa-flip-horizontal " />
            CALL
          </a>
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          <Helmet>
            <title>
              {listing.title}- Swaptr - Buy/Sell Anything Without Money{" "}
            </title>
            */}
            {/* <meta property="og:image" content={listingMainImage} /> */}
            {/* <meta property="og:url" content={shareLink} /> */}
            {/* <!-- No need to change anything here --> */}
            <meta property="og:type" content="website" />
            <meta property="fb:app_id" content="2197336787243372" />
          </Helmet>
        </div>
        <div className="card">
          <div className="card-header font-weight-bold">
            {listing.title}
            {auth.uid === listing.sellerUid ? (
              <Link
                to={`/manage/${listing.id}`}
                className=" ml-1 border-0 text-underline"
              >
                (Click To Edit)
              </Link>
            ) : (
              ""
            )}

            <div className="dropdown float-right mt-1">
              <i
                className="fas fa-share-alt fa-lg  "
                id="dropdownShare"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              />
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownShare"
              >
                <a className="dropdown-item" href="/">
                  <i className="fab fa-facebook fa-lg  mt-1 mr-1" />
                  Facebook
                </a>

                <a
                  className="dropdown-item"
                  href={`whatsapp://send?text=https://swaptr1.firebaseapp.com/listing/${listing.id}`}
                >
                  <i className="fab fa-whatsapp fa-lg  mt-1 mr-1" />
                  Whatsapp with link
                </a>

                <a className="dropdown-item" href="/">
                  <i className="fas fa-link fa-lg  mt-1 mr-1" />
                  Copy Link
                </a>
              </div>
            </div>
          </div>
          <div className="card-body ">
            <p>{listing.description}</p>
          </div>
          {auth.isEmpty ? (
            <div
              id="action-buttons-unauth"
              className="w-100 hide-fixed-buttons"
            >
              <button
                className="btn btn-lg btn-primary chat-button-fixed font-weight-bold w-100"
                onClick={() => openModal("LoginModal")}
              >
                <i className="far fa-comment-alt fa-lg mr-2"></i>
                Chat With Seller
              </button>
            </div>
          ) : (
            chatOrEdit
          )}
        </div>
      </div>
    );
  }
}

export default ListingDetailedBody;
