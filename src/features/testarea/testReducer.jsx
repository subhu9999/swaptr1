import { FETCH_LOCATIONS } from "./testConstants";
import { createReducer } from "../../app/common/util/reducerUtil";

const initialState = {
  data: {}
};

export const fetchLocations = (state, payload) => {
  const { data } = payload;
  console.log(payload);
  // return data;
};

export default createReducer(initialState, {
  [FETCH_LOCATIONS]: fetchLocations
});
