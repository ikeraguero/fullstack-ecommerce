import { useCalculateShipping } from "@api/orders/shipping.api";
import { useReducer, createContext, useContext } from "react";

const CheckoutContext = createContext();

const initialState = {
  order: null,
  checkoutStep: "shipping",
  totalItemsPrice: 0,
  shippingPrice: 0,
  isProcessingPayment: false,
  isLoading: false,
};

function checkoutReducer(state, action) {
  switch (action.type) {
    case "RESET_STATE":
      return initialState;
    default:
      return {
        ...state,
        [action.type]: action.payload,
      };
  }
}

export function CheckoutProvider({ children }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const updateCheckoutState = (type, payload) => {
    dispatch({ type, payload });
  };

  const resetCheckoutState = () => {
    dispatch({ type: "RESET_STATE" });
  };

  const { mutateAsync: calculateShipping } = useCalculateShipping();

  async function calculateShippingPrice(shippingValues) {
    const { postalCode } = shippingValues;
    const data = {
      postalCode,
    };

    updateCheckoutState("isLoading", true);
    const { shippingPrice } = await calculateShipping(data);
    updateCheckoutState("shippingPrice", shippingPrice);
    updateCheckoutState("isLoading", false);
  }

  return (
    <CheckoutContext.Provider
      value={{
        ...state,
        updateCheckoutState,
        resetCheckoutState,
        calculateShippingPrice,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}
