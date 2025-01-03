import { useCart } from "../api/cart/cart.api";

function useCartData(userId) {
  const { data: cart, error, refetch, isLoading } = useCart(userId);
  return { cart, error, refetch, isLoading };
}

export default useCartData;
