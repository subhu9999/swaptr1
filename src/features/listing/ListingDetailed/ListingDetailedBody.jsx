import React, { Component } from "react";

class ListingDetailedBody extends Component {
  render() {
    const { listing } = this.props;

    return (
      <div>
        <div className="card">
          <div className="card-header font-weight-bold">
            {listing.title}

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
                <a className="dropdown-item" href="/">
                  <i className="fab fa-whatsapp fa-lg  mt-1 mr-1" />
                  Whatsapp
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
          <div id="action-buttons" className="w-100 hide-fixed-buttons">
            <a
              href="/"
              className="btn btn-lg btn-primary chat-button-fixed font-weight-bold w-50"
            >
              <i className="far fa-comment-alt  mr-1" />
              CHAT
            </a>
            <a
              href="/"
              className="btn btn-lg btn-primary call-button-fixed font-weight-bold w-50"
            >
              <i className="fas fa-phone mr-1 fa-flip-horizontal " />
              CALL
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ListingDetailedBody;
