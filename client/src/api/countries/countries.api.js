import { useQuery } from "@tanstack/react-query";

import { apiClientCountries } from "../apiClient";

async function fetchCountries() {
  try {
    const res = await apiClientCountries("/all");
    if (res.status !== 200) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }
    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Unexpected error while fetching countries";
    throw new Error(message);
  }
}

export function useCountries() {
  return useQuery({
    queryFn: () => fetchCountries(),
    queryKey: ["countries"],
    onError: (error) => {
      console.error("Error fetching countries:", error.message);
    },
  });
}
