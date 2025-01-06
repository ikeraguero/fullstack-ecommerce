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
} from "./constants";
const initialState = {
  order: null,
  checkoutStep: "shipping",
  totalItemsPrice: 0,
  shippingPrice: 0,
  isProcessingPayment: false,
  loading: false,
};

// function checkoutReducer(state = initialState, action) {
//   switch (action.type) {
//     case "SET_ITEMS_PRICE":
//       console.log(action.payload);
//       return { ...state, totalItemsPrice: action.payload };
//     case "SET_SHIPPING_PRICE":
//       return { ...state, shippingPrice: action.payload };
//     case "SET_LOADING":
//       return { ...state, loading: action.payload };
//     case "SET_CHECKOUT_STEP":
//       return { ...state, checkoutStep: action.payload };
//     case "SET_IS_PROCESSING_PAYMENT":
//       return { ...state, isProcessingPayment: action.payload };
//     case "RESET":
//       return initialState;
//     default:
//       return state;
//   }
// }

// export default checkoutReducer;

function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER:
      return { ...state, order: action.payload };
    case PROCESS_ORDER_PAYMENT:
      return { ...state, isProcessingPayment: true };
    case SUCCESSFUL_PAYMENT:
      return { ...state, order: null, isProcessingPayment: false };
    case SET_ITEMS_PRICE:
      return { ...state, totalItemsPrice: action.payload };
    case SET_SHIPPING_PRICE:
      return { ...state, shippingPrice: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_CHECKOUT_STEP:
      return { ...state, checkoutStep: action.payload };
    case SET_IS_PROCESSING_PAYMENT:
      return { ...state, isProcessingPayment: action.payload };
    case RESET_CHECKOUT:
      return initialState;
    default:
      return state;
  }
}

export default checkoutReducer;
