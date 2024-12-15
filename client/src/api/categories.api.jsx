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

async function fetchCategories() {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`/categories`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

async function fetchCategoryById(categoryId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`/categories/${categoryId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });
}

export function useCategoryById(categoryId) {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCategoryById(categoryId),
  });
}
