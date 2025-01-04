import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";

async function fetchCart(userId, dispatch) {
  if (userId == null) {
    return { items: [] };
  }

  const res = await apiClient.get(`/cart/${userId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the cart data");
  }

  return res.data;
}

async function checkProductInUserCart(productId, userId) {
  if (!userId) {
    return { items: [] };
  }
  const res = await apiClient.get(`/cart/${userId}/${productId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the product data from the cart");
  }
  return res.data;
}

async function updateCartItem(data) {
  const res = await apiClient.put("/cartItem", data);
  if (res.status !== 200) {
    throw new Error("Error updating the cart item");
  }
}

async function createCartItem(data) {
  const res = await apiClient.post(`/cartItem`, data);
  if (res.status !== 200) {
    throw new Error("Error creating the cart item");
  }
  return res.data;
}

async function deleteCartItem(cartItemId) {
  const res = await apiClient.delete(`/cart/${cartItemId}`);
  if (res.status !== 204) {
    throw new Error("Error deleting the cart item");
  }
}

export function useIsProductInUserCart(productId) {
  const userId = useSelector((state) => state.auth.id);

  return useQuery({
    queryKey: ["isProductInUserCart", productId, userId],
    queryFn: () => checkProductInUserCart(productId, userId),
    onError: (error) => {
      console.error("Error checking product in cart:", error.message);
    },
  });
}

//hook for createCartItem
export function useAddToCart() {
  return useApiMutation(createCartItem, "cart", null, (error) => {
    console.error("Error adding item to cart:", error.message);
  });
}

export function useUpdateCartItem() {
  const userId = useSelector((state) => state.auth.id);
  const { refetch } = useCart(userId);

  return useApiMutation(
    updateCartItem,
    "cart",
    () => {
      refetch();
    },
    (error) => {
      console.error("Error updating cart item:", error.message);
    }
  );
}

export function useDeleteCartItem(refetch) {
  return useApiMutation(
    (cartItemId) => {
      deleteCartItem(cartItemId);
    },
    "cart",
    () => refetch(),
    (error) => {
      console.error("Error deleting cart item:", error.message);
    }
  );
}

export function useCart(userId) {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchCart(userId, dispatch),
    onError: (error) => {
      console.error("Error fetching cart:", error.message);
    },
  });
}
