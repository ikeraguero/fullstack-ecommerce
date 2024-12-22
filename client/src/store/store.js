import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import orderReducer from "../reducers/orderReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
  },
});

export default store;
