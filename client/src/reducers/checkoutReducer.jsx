const initialState = {
  checkoutStep: "shipping",
  shippingPrice: 0,
  isProcessingPayment: false,
  loading: false,
};

function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SHIPPING_PRICE":
      return { ...state, shippingPrice: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_CHECKOUT_STEP":
      return { ...state, checkoutStep: action.payload };
    case "SET_IS_PROCESSING_PAYMENT":
      return { ...state, isProcessingPayment: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default checkoutReducer;
