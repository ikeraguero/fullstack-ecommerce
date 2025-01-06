import { useQuery } from "@tanstack/react-query";

import { apiClient } from "../apiClient";

async function fetchRoles() {
  try {
    const res = await apiClient.get(`/roles`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching roles");
  }
}

export function useRoles() {
  return useQuery({
    queryFn: () => fetchRoles(),
    queryKey: ["roles"],
    onError: (error) => {
      console.error("Error in fetching roles:", error.message);
    },
  });
}
