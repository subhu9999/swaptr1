// import moment from "moment";

export const createNewListing = (user, sellerDetails, listing) => {
  return {
    ...listing,
    sellerUid: user.uid,
    sellerName: user.displayName,
    sellerPhoneNumber: sellerDetails.sellerPhoneNumber,
    sellerProfilePic:
      sellerDetails.sellerProfilePic || "/assets/default-user.png",
    created: Date.now(),
    tags:
      listing.title +
      " " +
      listing.description +
      " " +
      listing.category +
      " " +
      listing.city
  };
};
