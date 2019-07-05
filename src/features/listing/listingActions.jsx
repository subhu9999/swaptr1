import {
  DELETE_LISTING,
  DELETE_IMAGE,
  UPDATE_LISTING,
  FETCH_LISTING,
  TEMP_LISTING_PHOTOS,
  RESET_LISTING
} from "./listingConstants";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish
} from "../async/asyncActions";
// import {} from "../listing/";
import { fetchSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";
import { createNewListing } from "../../app/common/util/helpers";
import cuid from "cuid";

export const fetchListing = listing => {
  return {
    type: FETCH_LISTING,
    payload: listing
  };
};

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

export const deleteListing = listingId => {
  return {
    type: DELETE_LISTING,
    payload: {
      listingId
    }
  };
};

export const loadListings = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let listings = await fetchSampleData();
      // dispatch(fetchListings(listings));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const uploadImages = file => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  // console.log(file);
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  // Create the file metadata
  var metadata = {
    contentType: "image/jpeg"
  };
  // console.log(file);
  // Create a root reference
  var storageRef = firebase.storage().ref();

  const fileName = file.name + cuid();
  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef
    .child(`${user.uid}/listing_images/` + fileName)
    .put(file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log("Upload is " + progress + "% done");
      // switch (snapshot.state) {
      //   case firebase.storage.TaskState.PAUSED: // or 'paused'
      //     console.log("Upload is paused");
      //     break;
      //   case firebase.storage.TaskState.RUNNING: // or 'running'
      //     console.log("Upload is running");
      //     break;
      //   default:
      //     console.log("wait");
      // }
    },
    function(error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;

        case "storage/canceled":
          // User canceled the upload
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
          console.log("wait");
      }
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        // console.log("File available at", downloadURL);
        dispatch({
          type: TEMP_LISTING_PHOTOS,
          payload: {
            imageURL: downloadURL,
            imageName: fileName,
            deleteToken: fileName
          }
        });
        dispatch(asyncActionFinish());
      });
    }
  );
};

export const loadImages = images => async dispatch => {
  images.forEach(image =>
    dispatch({
      type: TEMP_LISTING_PHOTOS,
      payload: {
        imageURL: image.imageURL,
        imageName: image.imageName
      }
    })
  );
};

export const deleteImage = image => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/listing_images/${image.imageName}`);
    // delete image from reducer

    dispatch({
      type: DELETE_IMAGE,
      payload: { imageName: image.imageName }
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting the image !");
  }
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
