import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  return instance;
};

async function fetchOrdersByUser(userId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`/orders/user/${userId}`);
  if (res.status !== 200) {
    return new Error("Problem fetching the data");
  }
  return res.data;
}

async function createOrder(orderData) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.post(`/order`, orderData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

async function fetchOrder(orderId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`/order/${orderId}`);
  if (res.status !== 200) {
    return new Error("Problem fetching the data");
  }
  return res.data;
}

async function payOrder(orderData, orderId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.put(`/order/${orderId}`, orderData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

export function usePayOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderData, orderId }) => {
      payOrder(orderData, orderId);
    },
    onSuccess: (data, variables) => {
      setTimeout(() => {
        queryClient.invalidateQueries(["cart"]);
        navigate(`/payment/success/${variables.orderId}`);
      }, 3000);
    },
  });
}

export function useOrdersByUser(userId) {
  return useQuery({
    queryFn: () => fetchOrdersByUser(userId),
    queryKey: ["userOrders"],
  });
}

export function useOrder(orderId) {
  return useQuery({
    queryFn: () => fetchOrder(orderId),
    queryKey: ["order"],
  });
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: (orderData) => createOrder(orderData),
  });
}
