import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { apiClient, apiClientPayment } from "../apiClient";
import useApiMutation from "../useApiMutation";
import useAuth from "@hooks/auth/useAuth";
import { useCheckout } from "@context/CheckoutContext";

async function fetchOrdersByUser(userId) {
  try {
    const res = await apiClient.get(`/orders/user/${userId}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching user orders"
    );
  }
}

async function fetchOrders(page, size) {
  try {
    const res = await apiClient.get(`/orders?page=${page}&size=${size}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching orders details"
    );
  }
}

async function fetchOrder(orderId) {
  try {
    const res = await apiClient.get(`/order/${orderId}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching order details"
    );
  }
}

async function createOrder(data) {
  try {
    const res = await apiClient.post(`/order`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error creating the order"
    );
  }
}

async function payOrder(paymentData) {
  try {
    const res = await apiClientPayment.post(`/process`, paymentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { success, message } = res.data;
    if (!success) throw new Error("Payment rejected");

    return message;
  } catch (error) {
    throw new Error(
      error.response?.data || "Error processing payment and updating order"
    );
  }
}

export function usePayOrder() {
  const queryClient = useQueryClient();
  const { resetCheckoutState } = useCheckout();
  const navigate = useNavigate();

  return useApiMutation(
    (paymentRequest) => payOrder(paymentRequest),
    "cart",
    (variables) => {
      setTimeout(() => {
        navigate(`/payment/success/${variables}`);
        queryClient.invalidateQueries(["cart"]);
        resetCheckoutState();
      }, 3000);
    },
    (error, variables) => {
      setTimeout(() => {
        navigate(`/payment/error/${variables}`);
        resetCheckoutState();
      }, 3000);
      console.error("Error processing payment:", error.message);
    }
  );
}

export function useOrdersByUser() {
  const { userId } = useAuth();

  return useQuery({
    queryKey: ["userOrders", userId],
    queryFn: () => fetchOrdersByUser(userId),
    onError: (error) => {
      console.error("Error fetching orders by user:", error.message);
    },
  });
}

export function useOrders(page, size) {
  return useQuery({
    queryKey: ["orders", page, size],
    queryFn: () => fetchOrders(page, size),
    onError: (error) => {
      console.error("Error fetching order:", error.message);
    },
  });
}

export function useOrder(orderId) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId),
    onError: (error) => {
      console.error("Error fetching order:", error.message);
    },
  });
}

export function useCreateOrder() {
  const { updateCheckoutState } = useCheckout();

  return useApiMutation(
    (orderData) => createOrder(orderData),
    "cart",
    async (order) => {
      const { totalPrice } = order;
      updateCheckoutState("totalItemsPrice", totalPrice);
      updateCheckoutState("checkoutStep", "shipping");
      updateCheckoutState("shippingPrice", 0);
    },
    (error) => {
      console.error("Error creating order:", error.message);
    }
  );
}
