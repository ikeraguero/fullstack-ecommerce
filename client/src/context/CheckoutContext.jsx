import { useCalculateShipping } from "@api/orders/shipping.api";
import { useReducer, createContext, useContext, useEffect } from "react";

const CheckoutContext = createContext();

const initialState = {
  order: null,
  checkoutStep: localStorage.getItem("checkoutStep") || "shipping",
  totalItemsPrice: Number(localStorage.getItem("totalItemsPrice")) || 0,
  shippingPrice: Number(localStorage.getItem("shippingPrice")) || 0,
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
  const { mutateAsync: calculateShipping } = useCalculateShipping();

  useEffect(() => {
    localStorage.setItem("checkoutStep", state.checkoutStep);
    localStorage.setItem("totalItemsPrice", state.totalItemsPrice);
    localStorage.setItem("shippingPrice", state.shippingPrice);
  }, [state.checkoutStep, state.totalItemsPrice, state.shippingPrice]);

  const updateCheckoutState = (type, payload) => {
    dispatch({ type, payload });
  };

  const resetCheckoutState = () => {
    localStorage.removeItem("checkoutStep");
    localStorage.removeItem("totalItemsPrice");
    localStorage.removeItem("shippingPrice");
    dispatch({ type: "RESET_STATE" });
  };

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
