import { createReducer } from "../../app/common/util/reducerUtil";
import {
  CREATE_LISTING,
  UPDATE_LISTING,
  DELETE_LISTING,
  FETCH_LISTINGS
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

export const fetchListings = (state, payload) => {
  return payload.listings;
};

export default createReducer(initialState, {
  [CREATE_LISTING]: createListing,
  [UPDATE_LISTING]: updateListing,
  [DELETE_LISTING]: deleteListing,
  [FETCH_LISTINGS]: fetchListings
});
