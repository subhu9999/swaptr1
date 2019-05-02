import React from "react";

const ListingDetailedPhotos = ({ listing }) => (
  <div>
    <div
      id="carouselExampleIndicators"
      className="carousel slide listing-detailed-img-holder "
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active indicator-color"
        />
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="1"
          className="indicator-color"
        />
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="2"
          className="indicator-color"
        />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100 listing-detailed-img"
            src={listing.listingMainPhoto || "/assets/swaptr-listing.jpg"}
            alt="First slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100 listing-detailed-img"
            src={listing.listingMainPhoto || "/assets/swaptr-listing.jpg"}
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100 listing-detailed-img"
            src={listing.listingMainPhoto || "/assets/swaptr-listing.jpg"}
            alt="Third slide"
          />
        </div>
      </div>
      <a
        className="carousel-control-prev carousel-control-background"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon " aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon " aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
    <div className="listing-detailed-thumbnails d-flex justify-content-center mx-auto mt-1">
      <img
        data-target="#carouselExampleIndicators"
        data-slide-to="0"
        className="active img-thumbnail listing-detailed-thumbnails mr-3"
        src={listing.listingMainPhoto}
        alt="listing"
      />
      <img
        data-target="#carouselExampleIndicators"
        data-slide-to="1"
        className="img-thumbnail listing-detailed-thumbnails mr-3"
        src={listing.listingMainPhoto}
        alt="listing"
      />
      <img
        data-target="#carouselExampleIndicators"
        data-slide-to="2"
        className="img-thumbnail listing-detailed-thumbnails mr-3"
        src={listing.listingMainPhoto}
        alt="listing"
      />
    </div>
  </div>
);

export default ListingDetailedPhotos;
