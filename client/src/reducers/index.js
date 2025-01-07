import { combineReducers } from "redux";
import authSlice from "./authSlice";
import productFormSlice from "./productFormSlice";
import userFormSlice from "./userFormSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  userForm: userFormSlice,
  productForm: productFormSlice,
});

export default rootReducer;
