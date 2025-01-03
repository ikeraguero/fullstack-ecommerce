import { useQuery } from "@tanstack/react-query";

import { apiClient } from "../apiClient";

async function fetchCategories() {
  try {
    const res = await apiClient.get(`/categories`);
    if (res.status !== 200) {
      throw new Error("Problem fetching the data");
    }
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Unexpected error while fetching categories"
    );
  }
}

async function fetchCategoryById(categoryId) {
  try {
    const res = await apiClient.get(`/categories/${categoryId}`);
    if (res.status !== 200) {
      throw new Error("Problem fetching the data");
    }
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Unexpected error while fetching the category"
    );
  }
}

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    onError: (error) => {
      console.error("Error fetching categories:", error.message);
    },
  });
}

export function useCategoryById(categoryId) {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategoryById(categoryId),
    onError: (error) => {
      console.error("Error fetching category", error.message);
    },
  });
}
