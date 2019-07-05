import { createReducer } from "../../app/common/util/reducerUtil";
import {
  CREATE_LISTING,
  UPDATE_LISTING,
  DELETE_LISTING,
  DELETE_IMAGE,
  FETCH_LISTING,
  TEMP_LISTING_PHOTOS,
  RESET_LISTING
} from "./listingConstants";

const initialState = [];

export const createListing = (state, payload) => {
  return [...state, Object.assign({}, payload.listing)];
};

export const updateListing = (state, payload) => {
  return [
    //remove all the listing whose id is not equal to payload.listing.id
    ...state.filter(listing => listing.id !== payload.listing.id),
    Object.assign({}, payload.listing)
  ];
};

export const deleteListing = (state, payload) => {
  return [...state.filter(event => event.id !== payload.eventId)];
};

export const fetchListing = (state, payload) => {
  console.log(payload.listing);
  return [payload.listing];
};

export const setTempListingPhotos = (state, payload) => {
  // console.log(payload.images);
  return [...state, payload];
};

export const deleteImage = (state, payload) => {
  return [...state.filter(image => image.imageName !== payload.imageName)];
};

export const resetListing = (state, payload) => {
  return [];
};

export default createReducer(initialState, {
  [CREATE_LISTING]: createListing,
  [UPDATE_LISTING]: updateListing,
  [DELETE_LISTING]: deleteListing,
  [FETCH_LISTING]: fetchListing,
  [TEMP_LISTING_PHOTOS]: setTempListingPhotos,
  [DELETE_IMAGE]: deleteImage,
  [RESET_LISTING]: resetListing
});
