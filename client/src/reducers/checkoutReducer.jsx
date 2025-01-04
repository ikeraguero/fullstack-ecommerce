const SET_ORDER = "SET_ORDER";
const PROCESS_ORDER_PAYMENT = "PROCESS_ORDER_PAYMENT";
const SUCCESSFUL_PAYMENT = "SUCCESSFUL_PAYMENT";
const SET_ITEMS_PRICE = "SET_ITEMS_PRICE";
const SET_SHIPPING_PRICE = "SET_SHIPPING_PRICE";
const SET_LOADING = "SET_LOADING";
const SET_CHECKOUT_STEP = "SET_CHECKOUT_STEP";
const SET_IS_PROCESSING_PAYMENT = "SET_IS_PROCESSING_PAYMENT";
const RESET_CHECKOUT = "RESET_CHECKOUT";

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
