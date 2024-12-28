import axios from "axios";
import { BASE_URL } from "../config/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  return instance;
}

async function createWishlistItem(data) {
  const axiosInstance = createAxiosInstance();
  console.log(data);
  const res = await axiosInstance.post("/wishlist", data);
  if (res !== 201) {
    throw new Error("Problem");
  }
  return res.data;
}

async function fetchWishlist(userId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`/wishlist/${userId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

async function deleteWishlistItem(id) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.delete(`/wishlist/${id}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export function useDeleteWishlistItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteWishlistItem(id),
    onSuccess: queryClient.invalidateQueries(["wishlist"]),
  });
}

export function useWishlist(userId) {
  return useQuery({
    queryFn: () => fetchWishlist(userId),
    queryKey: ["wishlist"],
  });
}

export function useCreateWishlistItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createWishlistItem(data),
    onSuccess: queryClient.invalidateQueries(["wishlist"]),
  });
}
