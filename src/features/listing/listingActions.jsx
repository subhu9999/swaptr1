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

export const fetchListings = listings => {
  return {
    type: FETCH_LISTINGS,
    payload: listings
  };
};

export const createListing = listing => {
  return {
    type: CREATE_LISTING,
    payload: {
      listing
    }
  };
};

export const updateListing = listing => {
  return {
    type: UPDATE_LISTING,
    payload: {
      listing
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
