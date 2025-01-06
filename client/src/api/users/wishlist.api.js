import { useQuery } from "@tanstack/react-query";

import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";
import useUserState from "@hooks/user/useUserState";

async function createWishlistItem(data) {
  try {
    const res = await apiClient.post("/wishlist", data);
    if (res.status !== 201) {
      throw new Error("Error creating wishlist item");
    }
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error creating wishlist item"
    );
  }
}

async function fetchWishlist(userId) {
  try {
    const res = await apiClient.get(`/wishlist/${userId}`);
    if (res.status !== 200) {
      throw new Error("Error fetching wishlist data");
    }
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching wishlist data"
    );
  }
}

async function deleteWishlistItem(id) {
  try {
    const res = await apiClient.delete(`/wishlist/${id}`);
    if (res.status !== 200) {
      throw new Error("Error deleting wishlist item");
    }
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error deleting wishlist item"
    );
  }
}

export function useDeleteWishlistItem() {
  return useApiMutation(
    (id) => deleteWishlistItem(id),
    "wishlist",
    null,
    (error) => {
      console.error("Error deleting wishlist item:", error.message);
    }
  );
}

export function useWishlist() {
  const { userId } = useUserState();
  return useQuery({
    queryFn: () => fetchWishlist(userId),
    queryKey: ["wishlist"],
  });
}

export function useCreateWishlistItem() {
  return useApiMutation(
    (data) => createWishlistItem(data),
    "wishlist",
    null,
    (error) => {
      console.error("Error creating wishlist item:", error.message);
    }
  );
}
