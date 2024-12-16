import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config/config";
import axios from "axios";

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  return instance;
}

async function search(query) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get("/products/search", {
    params: { query: query },
  });
  console.log(res.data);
  return res.data;
}

export function useSearch() {
  return useMutation({
    mutationFn: (query) => search(query),
    onSuccess: (data) => {
      console.log("Search success:", data);
    },
  });
}
