import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import axios from "axios";

async function fetchProducts() {
  const res = await axios.get(`${BASE_URL}/products`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

async function fetchProductById(productId) {
  const res = await axios.get(`${BASE_URL}/products/${productId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  console.log(res.data);
  return res.data;
}

export default function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: fetchProducts });
}

export function useProduct(productId) {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProductById(productId),
  });
}
