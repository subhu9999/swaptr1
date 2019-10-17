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

export const addUserChat = (chatDetails, values) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  console.log("addUserChat");
  const firebase = getFirebase();
  let resUserChat;
  const user = firebase.auth().currentUser;
  let newChat = {
    ...chatDetails,
    date: Date.now(),
    seen: true
  };

  try {
    await firebase.push(`user_chat/${user.uid}`, newChat).then(res => {
      resUserChat = {
        ...newChat,
        id: res.key
      };
    });
    // .then(res => console.log(res));
    return resUserChat;
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Please Try Again Later !");
  }
};

export const addUserChatReceiver = (chatDetails, values) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  console.log("addUserChatReceiver");

  // console.log(chatDetails);
  //runs only when first time messaged by user
  const firebase = getFirebase();

  // const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  console.log(user.uid);
  console.log(chatDetails);
  const receiverId = chatDetails.receiverUid;
  let newChat = {
    ...chatDetails,
    date: Date.now(),
    seen: false,
    receiverUid: user.uid,
    receiverName: user.displayName,
    receiverPic: user.photoURL,
    receiverLastSeen: Date.now()
  };

  try {
    // await firebase.push(`user_chat/${user.uid}`, newChat);
    await firebase.set(`user_chat/${receiverId}/${chatDetails.id}`, newChat);
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Please Try Again Later !");
  }
};

export const addChatComment = (chat, values, swapListing) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  console.log("addChatComment");

  // console.log(chat);
  // console.log(values);
  const firebase = getFirebase();

  const user = firebase.auth().currentUser;

  //if prevoius comments exists then
  let comments = [];
  if (chat.comments) {
    comments = chat.comments;
  } else {
    dispatch(addUserChatReceiver(chat, values));
  }
  let newComment;
  if (swapListing) {
    console.log(swapListing);
    newComment = {
      text: values.comment,
      swapListing: {
        title: swapListing.title,
        id: swapListing.id,
        image: swapListing.images[0],
        city: swapListing.city
      },
      date: Date.now(),
      authorId: user.uid
    };
  } else {
    newComment = {
      text: values.comment,
      date: Date.now(),
      authorId: user.uid
    };
  }

  comments.push(newComment);

  try {
    // update comment  in current user
    await firebase.set(`user_chat/${user.uid}/${chat.id}`, {
      ...chat,
      comments: comments,
      seen: true
    });
    // //update chat seen to false & receiver last seen date n comment in rceiver -- use user.uid to change receiverUid everytime
    await firebase.set(`user_chat/${chat.receiverUid}/${chat.id}`, {
      ...chat,
      seen: false,
      comments: comments,
      receiverUid: user.uid,
      receiverName: user.displayName,
      receiverPic: user.photoURL,
      receiverLastSeen: Date.now()
    });
    // dispatch(addChatCommentReceiver(chat, values));
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Please Try Again Later !");
  }
};

export const setChatSeenTrue = userChat => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  const user = firebase.auth().currentUser;

  if (userChat) {
    //set seen true for all chats & last seen
    userChat.forEach(chat => {
      let newChat = {
        ...chat,
        seen: true
      };

      try {
        // update comment in current user
        firebase.set(`user_chat/${user.uid}/${chat.id}`, newChat);
      } catch (error) {
        console.log(error);
        toastr.error("Oops", "Please Try Again Later !");
      }
    });
    // console.log(userChat);
  }
};

export const deleteChat = userChatId => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  const user = firebase.auth().currentUser;
  // console.log(userChat);
  try {
    // delete chat in current user
    firebase.set(`user_chat/${user.uid}/${userChatId}`, null);
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Please Try Again Later !");
  }
};
