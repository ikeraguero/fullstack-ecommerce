import { combineReducers } from "redux";
import authReducer from "./authReducer";
import checkoutReducer from "./checkoutReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  checkout: checkoutReducer,
});

export default rootReducer;
