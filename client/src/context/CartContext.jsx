import { createContext, useContext } from "react";
import useCartData from "../hooks/cart/useCartData";
import useUserId from "../hooks/user/useUserId";

const CartContext = createContext();

export function CartProvider({ children }) {
  const userId = useUserId();
  const { cart, refetch, isLoading } = useCartData(userId ?? null);

  if (isLoading) return <div>Loading...</div>;
  const { cartItems, id: cartId } = cart;

  return (
    <CartContext.Provider value={{ cartItems, cartId, refetch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
