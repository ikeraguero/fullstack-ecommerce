import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: null,
  checkoutStep: "shipping",
  totalItemsPrice: 0,
  shippingPrice: 0,
  isProcessingPayment: false,
  loading: false,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
    },
    processOrderPayment(state) {
      state.isProcessingPayment = true;
    },
    successfulPayment(state) {
      state.order = null;
      state.isProcessingPayment = false;
    },
    setItemsPrice(state, action) {
      state.totalItemsPrice = action.payload;
    },
    setShippingPrice(state, action) {
      state.shippingPrice = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCheckoutStep(state, action) {
      state.checkoutStep = action.payload;
    },

    setIsProcessingPayment(state, action) {
      state.isProcessingPayment = action.payload;
    },
    resetCheckout(state) {
      return initialState;
    },
  },
});

export const {
  setOrder,
  processOrderPayment,
  successfulPayment,
  setItemsPrice,
  setShippingPrice,
  setLoading,
  setCheckoutStep,
  setIsProcessingPayment,
  resetCheckout,
} = checkoutSlice.actions;


export default checkoutSlice.reducer;
