import { useMutation } from "@tanstack/react-query";
import { createCartItem } from "../api/cart.api";

export function useAddToCart(refetch) {
  const mutation = useMutation({
    mutationFn: async (postData) => {
      const res = await createCartItem(postData);
      return res;
    },
    onSuccess: (data) => {
      refetch();
    },
    onError: (error) => {
      console.error("Error posting data:", error);
    },
  });

  return mutation;
}
