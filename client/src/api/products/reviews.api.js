import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";
import { useProduct } from "./products.api";

async function createReview(data) {
  const res = await apiClient.post("/review", data);
  if (res.status !== 201) {
    throw new Error("Problem creating the data");
  }
  return res.data;
}

export function useCreateReview(id) {
  const { refetch } = useProduct(id);
  return useApiMutation(
    (data) => {
      createReview(data);
    },
    "products",
    () => {
      refetch();
    },
    (error) => console.error("Error creating review:", error.message)
  );
}
