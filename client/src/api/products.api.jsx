import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { useProductFormContext } from "../hooks/useProductsFormContext";
import { useState } from "react";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  return instance;
};

async function updateProduct(data) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.put(`/products`, data, {
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

async function createProduct(data) {
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

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}

async function fetchProducts() {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`/products`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

async function fetchProductById(productId, userId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`/products/${productId}`, {
    headers: {
      "User-ID": userId,
    },
  });
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

async function fetchProductByCategory(categoryName) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`/products/categories/${categoryName}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

async function removeProduct(productId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.delete(`/products/${productId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export function useRemoveProduct() {
  const { state: productsState, dispatch: productsDispatch } =
    useProductFormContext();
  const { products } = productsState;
  const [productIdRemove, setProductIdRemove] = useState();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => {
      setProductIdRemove(productId);
      removeProduct(productId);
    },
    onSuccess: () => {
      console.log("oi");
      queryClient.invalidateQueries(["products"]);
      productsDispatch({
        type: "loadProducts",
        payload: products.filter((product) => product.id !== productIdRemove),
      });
    },
  });
}

export default function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: fetchProducts });
}

export function useProductsByCategory(categoryName) {
  return useQuery({
    queryKey: ["productsByCategory"],
    queryFn: () => fetchProductByCategory(categoryName),
  });
}

export function useProduct(productId, userId) {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProductById(productId, userId),
  });
}
