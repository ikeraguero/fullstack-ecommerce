import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config/config";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  return instance;
};

async function createOrder(orderData) {
  const axiosInstance = createAxiosInstance();
  const { data } = await axiosInstance.post(`/order`, orderData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (data.payment_url) {
    window.location.href = data.payment_url;
  }
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: (orderData) => createOrder(orderData),
  });
}
