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
  if (objectToArray) {
    let desc = objectToArray;
    desc.sort(function(a, b) {
      return b.date - a.date;
    });
  }

  // console.log(desc);
  //object to array in descending order
  return objectToArray;
};

export const objectToArraySomeFalse = object => {
  let objectToArray = objectToArrayDesc(object);

  let someFalse;
  //check if atleast one value in array is false
  function checkSeen(chat) {
    return chat.seen === false;
  }
  if (objectToArray) {
    someFalse = objectToArray.some(checkSeen);
  }
  // console.log(someFalse);

  return someFalse;
};

export const createNewListing = (user, sellerDetails, listing) => {
  const tagsString =
    listing.title +
    " " +
    listing.description +
    " " +
    listing.category +
    " " +
    listing.city;

  //convert string to array
  const tagsArray = tagsString.split(/\s+/);

  //remove duplicates tags
  let x = tagsArray => tagsArray.filter((v, i) => tagsArray.indexOf(v) === i);
  let uniqueTags = x(tagsArray);
  // console.log(uniqueTags);

  let rawCity = listing.city;
  //remove india & space immediately after comma ,
  // let removeIndia = rawCity.replace(/\s*,\s*/g, ",").replace("India", "");
  // console.log(removeIndia);

  //extract last 2 words i.e town name & state
  let testing = rawCity.split(",").splice(-2);
  // console.log(testing);
  let filterCity = testing[0] + " " + testing[1];
  console.log(filterCity);
  return {
    ...listing,
    views: 0,
    filterCity: filterCity,
    sellerUid: user.uid,
    sellerName: user.displayName,
    // sellerPhoneNumber: sellerDetails.sellerPhoneNumber,
    sellerProfilePic:
      sellerDetails.sellerProfilePic || "/assets/default-user.png",
    created: Date.now(),
    tags: uniqueTags
  };
};
