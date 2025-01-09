import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import productFormSlice from "../slices/productFormSlice";
import userFormSlice from "../slices/userFormSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    userForm: userFormSlice,
    productForm: productFormSlice,
  },
});

export default store;
