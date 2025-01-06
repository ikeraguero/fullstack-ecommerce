import { useCart } from "../../api/cart/cart.api";

function useCartData() {
  const { data: cart, error, refetch, isLoading } = useCart();
  return { cart, error, refetch, isLoading };
}

export default useCartData;
