import { toastr } from "react-redux-toastr";
import { closeModal } from "../modals/modalActions";


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
