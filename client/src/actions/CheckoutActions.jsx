export const setShippingPrice = (price) => ({
  type: "SET_SHIPPING_PRICE",
  payload: price,
});

export const setLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading,
});

export const setCheckoutStep = (checkoutStep) => ({
  type: "SET_CHECKOUT_STEP",
  payload: checkoutStep,
});

export const setIsProcessingPayment = (isProcessingPayment) => ({
  type: "SET_IS_PROCESSING_PAYMENT",
  payload: isProcessingPayment,
});
