import { combineReducers } from "redux";
import authReducer from "./authReducer";
import checkoutReducer from "./checkoutReducer";
import userFormReducer from "./userFormReducer";
import productFormReducer from "./productFormReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  checkout: checkoutReducer,
  userForm: userFormReducer,
  productForm: productFormReducer,
});

export default rootReducer;
