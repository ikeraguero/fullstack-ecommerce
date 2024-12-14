import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { useAuth } from "../context/AuthContext";

const createAxiosInstance = (authToken) => {
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  if (authToken) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    console.log("Token added to headers:", authToken);
  } else {
    console.log("No token found");
  }

  return instance;
};

async function fetchCategories(authToken) {
  const axiosInstance = createAxiosInstance(authToken);
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
  const { authToken } = useAuth();
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(authToken),
  });
}

export function useCategoryById(categoryId) {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCategoryById(categoryId),
  });
}
