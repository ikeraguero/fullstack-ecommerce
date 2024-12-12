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

async function fetchCategories() {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`${BASE_URL}/categories`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

async function fetchCategoryById(categoryId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`${BASE_URL}/categories/${categoryId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export default function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
}

export function useCategoryById(categoryId) {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCategoryById(categoryId),
  });
}
