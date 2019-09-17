import {
  DELETE_LISTING,
  RESET_LISTING,
  FETCH_LISTING
} from "./listingConstants";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish
} from "../async/asyncActions";
import { toastr } from "react-redux-toastr";
import { createNewListing } from "../../app/common/util/helpers";
// import cuid from "cuid";
import firebase from "../../app/config/firebase";

export const createListing = listing => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    // const sellerProfilePic = getState().firebase.profile.photoURL;
    const sellerDetails = {
      sellerPhoneNumber: getState().firebase.profile.phoneNumber || "0000",
      sellerProfilePic: getState().firebase.profile.photoURL
    };
    // console.log(user);
    // console.log(profilePic);
    let newListing = createNewListing(user, sellerDetails, listing);
    console.log(newListing);
    try {
      let createdListing = await firestore.add("listings", newListing);
      await firestore.set(`user_listings/${createdListing.id}_${user.uid}`, {
        listingId: createdListing.id,
        userUid: user.uid,
        host: true
      });
      toastr.success(
        "Success!",
        "your listing is created & will be active soon !"
      );
    } catch (error) {
      //TODO: delete images
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const updateListing = (listing, listingId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`listings/${listingId}`, listing);
      toastr.success(
        "Success!",
        "your listing is updated & will be active soon !"
      );
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

// export const deleteListing = listingId => {
//   return {
//     type: DELETE_LISTING,
//     payload: {
//       listingId
//     }
//   };
// };

export const deleteListing = listingId => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    const listingsRef = firestore.collection("listings");
    const userListingsRef = firestore.collection("user_listings");

    try {
      await listingsRef.doc(listingId).delete();
      await userListingsRef.doc(`${listingId}_${user.uid}`).delete();

      toastr.success("Success!", "your listing is DELETED !");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const resetListing = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({
    type: RESET_LISTING
  });
};

export const getUserListings = userUid => async (dispatch, getState) => {
  // let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const listingsQuery = firestore
    .collection("listings")
    .where("sellerUid", "==", userUid);
  try {
    dispatch(asyncActionStart());
    let querySnap = await listingsQuery.get();
    let listings = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let listing = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      listings.push(listing);
    }
    // console.log(listings);
    dispatch({ type: FETCH_LISTING, payload: { listings } });
    dispatch(asyncActionFinish());
    return listings;
  } catch (error) {
    dispatch(asyncActionError());
    console.log(error);
  }
};

export const getListingsForDashboard = lastListing => async (
  dispatch,
  getState
) => {
  const firestore = firebase.firestore();
  const listingsRef = firestore.collection("listings");
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastListing &&
      (await firestore
        .collection("listings")
        .doc(lastListing.id)
        .get());

    let query;

    lastListing
      ? (query = listingsRef
          .orderBy("created", "desc")
          .startAfter(startAfter)
          .limit(4))
      : (query = listingsRef.orderBy("created", "desc").limit(4));

    let querySnap = await query.get();

    //return if no more data found
    if (querySnap.docChanges().length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }
    let listings = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let listing = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      listings.push(listing);
    }
    // console.log(listings);
    dispatch({ type: FETCH_LISTING, payload: { listings } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const getListingsForSearch = (searchQuery, lastListing) => async (
  dispatch,
  getState
) => {
  console.log(searchQuery);
  console.log(lastListing);
  const firestore = firebase.firestore();
  const listingsRef = firestore.collection("listings");
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastListing &&
      (await firestore
        .collection("listings")
        .doc(lastListing.id)
        .get());
    let query;
    lastListing
      ? (query = listingsRef
          .orderBy("created", "desc")
          .startAfter(startAfter)
          .limit(4))
      : // : (query = listingsRef.orderBy("created", "desc").limit(4));
        (query = listingsRef
          .where("tags", "array-contains", "199")
          .orderBy("created", "desc")
          .limit(4));

    let querySnap = await query.get();
    //return if no more data found
    if (querySnap.docChanges().length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }
    let listings = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      let listing = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      listings.push(listing);
    }
    // console.log(listings);
    dispatch({ type: FETCH_LISTING, payload: { listings } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const getListingsForAlgolia = () => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  const listingsRef = firestore.collection("listings");
  try {
    dispatch(asyncActionStart());

    let query = listingsRef.orderBy("created", "desc");

    let querySnap = await query.get();

    //return if no more data found
    if (querySnap.docChanges().length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }
    let listings = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let listing = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      listings.push(listing);
    }
    // console.log(listings);
    // dispatch({ type: FETCH_LISTING, payload: { listings } });
    dispatch(asyncActionFinish());
    // return querySnap;
    return listings;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
