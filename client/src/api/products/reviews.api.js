import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";

async function createReview(data) {
  const res = await apiClient.post("/review", data);
  if (res.status !== 201) {
    throw new Error("Problem creating the data");
  }
  return res.data;
}

export function useCreateReview(id) {
  return useApiMutation(
    (data) => {
      createReview(data);
    },
    "product",
    null,
    (error) => console.error("Error creating review:", error.message)
  );
}
