import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [itemsQuantity, setItemsQuantity] = useState(0);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  return (
    <CheckoutContext.Provider
      value={{
        itemsQuantity,
        setItemsQuantity,
        itemsPrice,
        setItemsPrice,
        shippingPrice,
        setShippingPrice,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}
