import axios from "axios";
import { BASE_URL } from "../config/config";
import { useMutation } from "@tanstack/react-query";

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  return instance;
}

async function calculateShipping(data) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.post("/calculate-shipping", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res.data);
  return res.data;
}

export function useCalculateShipping() {
  return useMutation({
    mutationFn: (data) => calculateShipping(data),
  });
}
