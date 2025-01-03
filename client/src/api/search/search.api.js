import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";

async function search(query) {
  try {
    const res = await apiClient.get("/products/search", {
      params: { query: query },
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error searching for products"
    );
  }
}

export function useSearch() {
  return useApiMutation(
    (query) => search(query),
    null,
    (data) => {
      console.log("Search success:", data);
    }
  );
}
