import { combineReducers } from "redux";
import checkoutReducer from "./checkoutReducer";
import authSlice from "./authSlice";
import productFormSlice from "./productFormSlice";
import userFormSlice from "./userFormSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  checkout: checkoutReducer,
  userForm: userFormSlice,
  productForm: productFormSlice,
});

export default rootReducer;
