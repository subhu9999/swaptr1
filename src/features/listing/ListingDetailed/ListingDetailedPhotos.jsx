import React from "react";

const ListingDetailedPhotos = ({ listing }) => {
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide listing-detailed-img-holder "
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          {listing.images &&
            listing.images.length >= 0 &&
            listing.images.map((image, index) => (
              <li
                key={image.imageURL}
                data-target="#carouselExampleIndicators"
                data-slide-to={index}
                className="active indicator-color"
              />
            ))}
          {/* <li
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
          /> */}
        </ol>
        <div className="carousel-inner">
          {listing.images &&
            listing.images.length >= 0 &&
            listing.images.map((image, index) => {
              let classes;
              if (index === 0) {
                classes = "carousel-item active";
              } else {
                classes = "carousel-item";
              }
              return (
                <div key={image.imageURL} className={classes}>
                  <img
                    className="d-block w-100 listing-detailed-img"
                    // src={listingPhoto || "/assets/swaptr-listing.jpg"}

                    src={image.imageURL}
                    alt={image.imageURL}
                  />
                </div>
              );
            })}
          {/* <div className="carousel-item active">
            <img
              className="d-block w-100 listing-detailed-img"
              src={listingPhoto || "/assets/swaptr-listing.jpg"}
              alt="First slide"
            />
          </div> */}
          {/* <div className="carousel-item">
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
          </div> */}
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

      <div className="mx-auto mt-1 border text-center">
        {listing.images &&
          listing.images.length >= 0 &&
          listing.images.map((image, index) => {
            let classes;
            if (index === 0) {
              classes = "active  img-thumbnail listing-detailed-thumbnails m-1";
            } else {
              classes = " img-thumbnail listing-detailed-thumbnails m-1";
            }
            return (
              <img
                key={image.imageURL}
                data-target="#carouselExampleIndicators"
                data-slide-to={index}
                className={classes}
                // src={listing.listingMainPhoto}
                src={image.imageURL}
                alt={image.imageURL}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ListingDetailedPhotos;
