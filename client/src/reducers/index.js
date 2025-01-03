import { combineReducers } from "redux";
import authReducer from "./authReducer";
import checkoutReducer from "./checkoutReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  checkout: checkoutReducer,
  order: orderReducer,
});

export default rootReducer;
