import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import axios from "axios";
import Cookies from "js-cookie";

const createAxiosInstance = () => {
  const token = Cookies.get("authToken");
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return instance;
};

async function fetchProducts() {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`${BASE_URL}/products`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

async function fetchProductById(productId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`${BASE_URL}/products/${productId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
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
