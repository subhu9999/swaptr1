import { combineReducers } from "redux";
import listingReducer from "../../features/listing/listingReducer";
import { reducer as FormReducer } from "redux-form";

const rootReducer = combineReducers({
  form: FormReducer,
  listings: listingReducer
});

export default rootReducer;
