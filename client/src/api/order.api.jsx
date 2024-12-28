import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const createAxiosInstance = () => {
  const instance = axios.create({
    withCredentials: true,
  });

  return instance;
};

async function fetchOrdersByUser(userId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(
    `http://localhost:8080/api/orders/user/${userId}`
  );
  if (res.status !== 200) {
    return new Error("Problem fetching the data");
  }
  return res.data;
}

async function createOrder(orderData) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.post(
    `http://localhost:8080/api/order`,
    orderData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
}

async function fetchOrder(orderId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(
    `http://localhost:8080/api/order/${orderId}`
  );
  if (res.status !== 200) {
    return new Error("Problem fetching the data");
  }
  return res.data;
}

async function payOrder(orderData, orderId, paymentData) {
  const axiosInstance = createAxiosInstance();
  console.log(paymentData);

  const resPayment = await axiosInstance.post(
    `http://localhost:8080/payment/process`,
    paymentData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { success } = resPayment.data;
  if (success) {
    const res = await axiosInstance.put(
      `http://localhost:8080/order/${orderId}`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
  throw new Error("Payment rejected");
}

export function usePayOrder() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderData, orderId, paymentRequest }) => {
      payOrder(orderData, orderId, paymentRequest);
    },
    onSuccess: (data, variables) => {
      setTimeout(() => {
        queryClient.invalidateQueries(["cart"]);
        navigate(`/payment/success/${variables.orderId}`);
      }, 3000);
    },
    onError: (data, variables) => {
      setTimeout(() => {
        navigate(`/payment/error/${variables.orderId}`);
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
