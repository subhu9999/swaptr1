import { combineReducers } from "redux";
import listingReducer from "../../features/listing/listingReducer";
import { reducer as FormReducer } from "redux-form";
import modalsReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  listings: listingReducer,
  modals: modalsReducer,
  auth: authReducer,
  async: asyncReducer
});

export default rootReducer;
