import { combineReducers } from "redux";
import listingReducer from "../../features/listing/listingReducer";

const rootReducer = combineReducers({
  listings: listingReducer
});

export default rootReducer;
