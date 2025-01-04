const SET_ORDER = "SET_ORDER";
const PROCESS_ORDER_PAYMENT = "PROCESS_ORDER_PAYMENT";
const SUCCESSFUL_PAYMENT = "SUCCESSFUL_PAYMENT";
const SET_ITEMS_PRICE = "SET_ITEMS_PRICE";
const SET_SHIPPING_PRICE = "SET_SHIPPING_PRICE";
const SET_LOADING = "SET_LOADING";
const SET_CHECKOUT_STEP = "SET_CHECKOUT_STEP";
const SET_IS_PROCESSING_PAYMENT = "SET_IS_PROCESSING_PAYMENT";
const RESET_CHECKOUT = "RESET_CHECKOUT";

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
export const resetCheckout = () => ({ type: RESET_CHECKOUT });
