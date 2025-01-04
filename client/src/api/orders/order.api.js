import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useCheckout from "../../hooks/cart/useCheckout";
import { apiClient, apiClientPayment } from "../apiClient";
import { useSelector } from "react-redux";
import useApiMutation from "../useApiMutation";

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

async function payOrder(orderData, orderId, paymentData) {
  try {
    const resPayment = await apiClientPayment.post(`/process`, paymentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { success } = resPayment.data;
    if (!success) throw new Error("Payment rejected");

    const res = await apiClient.put(`/order/${orderId}`, orderData);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error processing payment"
    );
  }
}

export function usePayOrder() {
  const queryClient = useQueryClient();
  const { resetCheckout } = useCheckout();
  const navigate = useNavigate();

  return useApiMutation(
    ({ orderData, orderId, paymentRequest }) =>
      payOrder(orderData, orderId, paymentRequest),
    "cart",
    (variables, data) => {
      setTimeout(() => {
        console.log(variables, data);
        navigate(`/payment/success/${variables.orderId}`);
        queryClient.invalidateQueries(["cart"]);
        resetCheckout();
      }, 3000);
    },
    (error, variables) => {
      setTimeout(() => {
        navigate(`/payment/error/${variables.orderId}`);
        resetCheckout();
      }, 3000);
      console.error("Error processing payment:", error.message);
    }
  );
}

export function useOrdersByUser() {
  const userId = useSelector((state) => state.auth.id);

  return useQuery({
    queryKey: ["userOrders", userId],
    queryFn: () => fetchOrdersByUser(userId),
    onError: (error) => {
      console.error("Error fetching orders by user:", error.message);
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
  const { setItemsTotalPrice } = useCheckout();
  const queryClient = useQueryClient();

  return useApiMutation(
    (orderData) => createOrder(orderData),
    null,
    async (order) => {
      setItemsTotalPrice(order.totalPrice);
      queryClient.invalidateQueries(["cart"]);
    },
    (error) => {
      console.error("Error creating order:", error.message);
    }
  );
}
