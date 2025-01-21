import useMixpanel from "@hooks/tracker/useMixpanel";
import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";

async function search(query, size) {
  try {
    const res = await apiClient.get("/products/search", {
      params: { q: query, size: size },
    });
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error searching for products"
    );
  }
}

export function useSearch() {
  const { mixpanelTrack } = useMixpanel();
  return useApiMutation(
    ({ query, size }) => search(query, size),
    null,
    (data) => {
      mixpanelTrack("Item Search");
      console.log("Search success:", data);
    }
  );
}
