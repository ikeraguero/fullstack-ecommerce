import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { useSelector } from "react-redux";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  return instance;
};

async function fetchCart(userId) {
  if (userId == null) {
    return { items: [] };
  }

  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`/cart/${userId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export async function checkProductInUserCart(productId, userId) {
  const axiosInstance = createAxiosInstance();
  if (!userId) {
    return { items: [] };
  }

  const res = await axiosInstance.get(`/cart/${userId}/${productId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

async function updateCartItem(data) {
  const axiosInstance = createAxiosInstance();
  const res = axiosInstance.put("/cartItem", data);
  if (res.status !== 200) {
    throw new Error("Error fetching the data");
  }
}

async function createCartItem(data) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.post(`/cartItem`, data);
  if (res.status !== 200) {
    throw new Error("Error fetching the data");
  }
  return res;
}

async function deleteCartItem(cartItemId) {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.delete(`/cart/${cartItemId}`);
}

export function useIsProductInUserCart() {
  return useQuery({
    queryKey: ["isProductInUserCart"],
    queryFn: () => checkProductInUserCart(),
  });
}

//hook for createCartItem
export function useAddToCart() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (postData) => {
      const res = await createCartItem(postData);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Error posting data:", error);
    },
  });

  return mutation;
}

export function useUpdateCartItem() {
  const userId = useSelector((state) => state.auth.id);
  const { refetch } = useCart(userId);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateCartItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      refetch();
    },
  });
}

export function useDeleteCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cartItemId) => deleteCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
}

export default function useCart(userId) {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchCart(userId),
  });
}
