// import moment from "moment";

// export const objectToArray = object => {
//   if (object) {
//     return Object.entries(object).map(e => Object.assign(e[1], { id: e[0] }));
//   }
// };

export const objectToArrayDesc = object => {
  let objectToArray;
  if (object) {
    objectToArray = Object.entries(object).map(e =>
      Object.assign(e[1], { id: e[0] })
    );
  }
  let desc = objectToArray;
  desc.sort(function(a, b) {
    return b.date - a.date;
  });
  // console.log(desc);
  //object to array in descending order
  return objectToArray;
};

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
