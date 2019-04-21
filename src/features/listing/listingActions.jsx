import {
  CREATE_LISTING,
  DELETE_LISTING,
  UPDATE_LISTING
} from "./listingConstants";

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
