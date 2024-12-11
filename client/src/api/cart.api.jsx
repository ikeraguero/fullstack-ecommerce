import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import axios from "axios";

const token = localStorage.getItem("authToken");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

async function fetchCart(userId) {
  const res = await axios.get(`${BASE_URL}/cart/${userId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export async function checkProductInUserCart(productId, userId) {
  const res = await axios.get(`${BASE_URL}/cart/${userId}/${productId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export async function deleteCartItem(cartItemId) {
  await axios.delete(`${BASE_URL}/cart/${cartItemId}`);
}

export default function useCart(userId) {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCart(userId),
  });
}
