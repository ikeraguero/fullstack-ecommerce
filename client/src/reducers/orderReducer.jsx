const initialState = {
  order: null,
  isProcessingPayment: false,
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ORDER":
      return { ...state, order: action.payload };
    case "PROCCESS_ORDER_PAYMENT":
      return { ...state, isProcessingPayment: true };
    case "SUCCESSFUL_PAYMENT":
      return { ...state, order: null, isProcessingPayment: false };
    default:
      return state;
  }
}

export default orderReducer;
