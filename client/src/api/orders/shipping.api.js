import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";

async function calculateShipping(data) {
  try {
    const res = await apiClient.post("/calculate-shipping", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error calculating shipping"
    );
  }
}

export function useCalculateShipping() {
  return useApiMutation(calculateShipping, "shipping", null, (error) => {
    console.error("Error during shipping calculation:", error.message);
  });
}
