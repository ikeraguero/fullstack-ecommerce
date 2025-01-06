import {
  SET_ORDER,
  PROCESS_ORDER_PAYMENT,
  SUCCESSFUL_PAYMENT,
  SET_ITEMS_PRICE,
  SET_SHIPPING_PRICE,
  SET_LOADING,
  SET_CHECKOUT_STEP,
  SET_IS_PROCESSING_PAYMENT,
  RESET_CHECKOUT,
} from "../reducers/constants";

export const setOrder = (order) => ({ type: SET_ORDER, payload: order });
export const processOrderPayment = () => ({ type: PROCESS_ORDER_PAYMENT });
export const successfulPayment = () => ({ type: SUCCESSFUL_PAYMENT });
export const setItemsPrice = (price) => ({
  type: SET_ITEMS_PRICE,
  payload: price,
});
export const setShippingPrice = (price) => ({
  type: SET_SHIPPING_PRICE,
  payload: price,
});
export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});
export const setCheckoutStep = (step) => ({
  type: SET_CHECKOUT_STEP,
  payload: step,
});
export const setIsProcessingPayment = (status) => ({
  type: SET_IS_PROCESSING_PAYMENT,
  payload: status,
});
export const resetCheckoutData = () => ({ type: RESET_CHECKOUT });
