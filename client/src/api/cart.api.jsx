import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../config/config";

const token = Cookies.get("authToken");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

async function fetchCart(userId) {
  console.log(userId);
  if (userId === 0) {
    return { items: [] };
  }

  const res = await axios.get(`${BASE_URL}/cart/${userId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export async function createCart(formData) {
  const res = await axios.post(`${BASE_URL}/cart/`, formData);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
}

export async function checkProductInUserCart(productId, userId) {
  if (!userId) {
    return { items: [] };
  }

  const res = await axios.get(`${BASE_URL}/cart/${userId}/${productId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export async function createCartItem(data) {
  const res = await axios.post(`${BASE_URL}/cartItem`, data);
  if (res.status !== 200) {
    throw new Error("Error fetching the data");
  }
  return res;
}

export async function deleteCartItem(cartItemId) {
  await axios.delete(`${BASE_URL}/cart/${cartItemId}`);
}

export default function useCart(userId) {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchCart(userId),
  });
}
