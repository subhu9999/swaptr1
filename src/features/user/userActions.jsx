import { toastr } from "react-redux-toastr";
import { closeModal } from "../modals/modalActions";
import cuid from "cuid";

//TODO: verify phone Number
export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  dispatch(closeModal());

  const firebase = getFirebase();

  //removing isLoading & isEmpty from user
  const { isLoaded, isEmpty, ...updatedUser } = user;
  try {
    //update firestore user profile document
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "Profile Updated");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = file => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  const path = `${user.uid}/user_images`;
  const imageName = cuid();
  const options = {
    name: imageName
  };
  try {
    // upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // console.log(uploadedFile);
    //get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    //   let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;

    //   //get user doc
    let userDoc = await firestore.get(`users/${user.uid}`);

    //   //check if user has photo ,if not update profile with new image
    if (!userDoc.data().photoURL) {
      //update firestore doc
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      //update firebase auth profile
      await user.updateProfile({
        photoURL: downloadURL
      });
    }
    //   //add the new photo link to photos collection
    return await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
  } catch (error) {
    //   console.log(error);
    throw new Error("Problem uploading photos");
  }
};

// export const uploadTest = files => async (
//   dispatch,
//   getState,
//   { getFirebase, getFirestore }
// ) => {
//   const firebase = getFirebase();
//   const firestore = getFirestore();
//   const user = firebase.auth().currentUser;

//   const path = `${user.uid}/test_images`;
//   files.forEach(async file => {
//     const imageName = cuid();
//     const options = {
//       name: imageName
//     };
//     try {
//       //upload the file to firebase storage
//       let uploadedFile = await firebase.uploadFile(path, file, null, options);

//       //get url of image
//       let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
//       // let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
//       console.log(downloadURL);
//     } catch (error) {
//       console.log(error);
//       throw new Error("Problem uploading photos");
//     }
//   });

// const imageName = cuid();
// const options = {
//   name: imageName
// };
// try {
//   //upload the file to firebase storage
//   let uploadedFile = await firebase.uploadFile(path, file, null, options);

//   //get url of image
//   let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
//   // let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
//   console.log(downloadURL);
//   // //get user doc
// let userDoc = await firestore.get(`users/${user.uid}`);

// //check if user has photo ,if not update profile with new image
// if (!userDoc.data().photoURL) {
//   //update firestore doc
//   await firebase.updateProfile({
//     photoURL: downloadURL
//   });
//   //update firebase auth profile
//   await user.updateProfile({
//     photoURL: downloadURL
//   });
// }
// //add the new photo to photos collection
// return await firestore.add(
//   {
//     collection: "users",
//     doc: user.uid,
//     subcollections: [{ collection: "photos" }]
//   },
//   {
//     name: imageName,
//     url: downloadURL
//   }
// );
// } catch (error) {
//   console.log(error);
//   throw new Error("Problem uploading photos");
// }
// };

// export const uploadImages = file => async (
//   dispatch,
//   getState,
//   { getFirebase, getFirestore }
// ) => {
//   const firebase = getFirebase();
//   const firestore = getFirestore();
//   const user = firebase.auth().currentUser;

//   // Create the file metadata
//   var metadata = {
//     contentType: "image/jpeg"
//   };
//   console.log(file);
//   // Create a root reference
//   var storageRef = firebase.storage().ref();

//   const fileName = file[0].name + cuid();
//   // Upload file and metadata to the object 'images/mountains.jpg'
//   var uploadTask = storageRef
//     .child(`${user.uid}/new/` + fileName)
//     .put(file[0], metadata);

//   // Listen for state changes, errors, and completion of the upload.
//   uploadTask.on(
//     firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//     function(snapshot) {
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log("Upload is " + progress + "% done");
//       switch (snapshot.state) {
//         case firebase.storage.TaskState.PAUSED: // or 'paused'
//           console.log("Upload is paused");
//           break;
//         case firebase.storage.TaskState.RUNNING: // or 'running'
//           console.log("Upload is running");
//           break;
//         default:
//           console.log("wait");
//       }
//     },
//     function(error) {
//       // A full list of error codes is available at
//       // https://firebase.google.com/docs/storage/web/handle-errors
//       switch (error.code) {
//         case "storage/unauthorized":
//           // User doesn't have permission to access the object
//           break;

//         case "storage/canceled":
//           // User canceled the upload
//           break;

//         case "storage/unknown":
//           // Unknown error occurred, inspect error.serverResponse
//           break;
//         default:
//           console.log("wait");
//       }
//     },
//     function() {
//       // Upload completed successfully, now we can get the download URL
//       uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//         console.log("File available at", downloadURL);
//       });
//     }
//   );
// };
