import {
  CREATE_LISTING,
  DELETE_LISTING,
  UPDATE_LISTING,
  FETCH_LISTINGS
} from "./listingConstants";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";

export const fetchListings = listings => {
  return {
    type: FETCH_LISTINGS,
    payload: listings
  };
};

export const createListing = listing => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_LISTING,
        payload: {
          listing
        }
      });
      toastr.success(
        "Success!",
        "your listing is created & will be active soon !"
      );
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const updateListing = listing => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_LISTING,
        payload: {
          listing
        }
      });
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
      dispatch(fetchListings(listings));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
