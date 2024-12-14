import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config/config";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  return instance;
};

export async function createProduct(data) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.post(`/products`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

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
