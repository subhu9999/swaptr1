import {
  TEMP_LISTING_PHOTOS,
  DELETE_IMAGE,
  RESET_IMAGES
} from "./tempImagesConstants";
// import firebase from "../../../app/config/firebase";
import {
  // asyncActionStart,
  // asyncActionError,
  asyncActionFinish
} from "../../async/asyncActions";
// import { toastr } from "react-redux-toastr";
import cuid from "cuid";

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

export const uploadImages = file => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  // console.log(file);
  const firebase = getFirebase();
  // const firestore = getFirestore();
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

export const deleteImage = image => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  // const firestore = getFirestore();
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

export const resetImages = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({
    type: RESET_IMAGES
  });
};
