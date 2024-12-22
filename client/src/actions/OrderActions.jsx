export const setOrder = (order) => ({
  type: "SET_ORDER",
  payload: order,
});

export const processOrderPayment = () => ({
  type: "PROCCESS_ORDER_PAYMENT",
});

export const successfulPayment = () => ({
  type: "SUCCESSFUL_PAYMENT",
});
