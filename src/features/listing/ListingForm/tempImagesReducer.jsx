import { createReducer } from "../../../app/common/util/reducerUtil";
import {
  TEMP_LISTING_PHOTOS,
  RESET_IMAGES,
  DELETE_IMAGE
} from "./tempImagesConstants";

const initialState = [];

export const setTempListingPhotos = (state, payload) => {
  // console.log(payload.images);
  return [...state, payload];
};

export const deleteImage = (state, payload) => {
  return [...state.filter(image => image.imageName !== payload.imageName)];
};

export const resetImages = (state, payload) => {
  return [];
};

export default createReducer(initialState, {
  [TEMP_LISTING_PHOTOS]: setTempListingPhotos,
  [DELETE_IMAGE]: deleteImage,
  [RESET_IMAGES]: resetImages
});
