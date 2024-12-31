import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import orderReducer from "../reducers/orderReducer";
import checkoutReducer from "../reducers/checkoutReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    checkout: checkoutReducer,
  },
});

export default store;
