import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import axios from "axios";

async function fetchCategories() {
  const res = await axios.get(`${BASE_URL}/categories`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

async function fetchCategoryById(categoryId) {
  const res = await axios.get(`${BASE_URL}/categories/${categoryId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  console.log(res.data);
  return res.data;
}

export default function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
}

export function useCategoryById(categoryId) {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCategoryById(categoryId),
  });
}
