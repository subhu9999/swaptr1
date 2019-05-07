import { combineReducers } from "redux";
import listingReducer from "../../features/listing/listingReducer";
import { reducer as FormReducer } from "redux-form";
import modalsReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  listings: listingReducer,
  modals: modalsReducer,
  auth: authReducer
});

export default rootReducer;
