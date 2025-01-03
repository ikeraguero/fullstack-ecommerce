import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";
async function createReview(data) {
  const res = apiClient.post("/review", data);
  if (res.status !== 201) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export function useCreateReview() {
  return useApiMutation(
    (data) => createReview(data),
    "products",
    null,
    (error) => console.error("Error creating review:", error.message)
  );
}
