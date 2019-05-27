import { SubmissionError, reset } from "redux-form";
import { closeModal, openModal } from "../modals/modalActions";
// import { history } from "../../index";
import { toastr } from "react-redux-toastr";

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
    } catch (error) {
      // console.log(error);
      throw new SubmissionError({
        // _error: error.message

        _error: "Please Check Your Email & Password !"
      });
    }
    // dispatch({ type: LOGIN_USER, payload: { creds } });
    dispatch(closeModal());
    // history.push("/createListing");
  };
};

export const registerUser = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  // console.log(user);
  try {
    //create the user in auth
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);

    //get current user
    let currentUser;
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        currentUser = user;
      } else {
        // No user is signed in.
      }
    });
    //update the auth profile
    // let currentUser = await firebase.auth().currentUser;
    // await createdUser.updateProfile({
    // displayName: "name"
    // });
    await currentUser.updateProfile({
      displayName: user.displayName
    });
    // create a new profile in firestore
    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp(),
      phoneNumber: user.phoneNumber
    };
    await firestore.set(`users/${currentUser.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message

      // _error: "Please Check Your Email & Password !"
    });
  }
};

export const forgotPassword = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();

  // var auth = firebase.auth();
  // var emailAddress = "user@example.com";

  // auth.sendPasswordResetEmail(emailAddress).then(function() {
  //   // Email sent.
  // }).catch(function(error) {
  //   // An error happened.
  // });

  try {
    await firebase.auth().sendPasswordResetEmail(user.email);
  } catch (error) {
    // console.log(error);
    throw new SubmissionError({
      _error: error.message

      // _error: "Please Check Your Email & Password !"
    });
  }
  dispatch(closeModal());
  dispatch(openModal("ResetLinkSuccessModal", { email: user.email }));
};

export const socialLogin = selectedProvider => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    dispatch(closeModal());
    let user = await firebase.login({
      provider: selectedProvider,
      type: "popup"
    });
    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        createdAt: firestore.FieldValue.serverTimestamp()
      });
      //TODO: ask phone number
      dispatch(openModal("PhoneNumberModal"));
    }
    // console.log(user);
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = creds => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  //get current user
  let currentUser;
  await firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      currentUser = user;
    } else {
      // No user is signed in.
    }
  });
  try {
    await currentUser.updatePassword(creds.newPassword1);
    await dispatch(reset("account"));
    toastr.success("Success", "your password has been updated");
  } catch (error) {
    throw new SubmissionError({
      _error: error.message
    });
  }
};
