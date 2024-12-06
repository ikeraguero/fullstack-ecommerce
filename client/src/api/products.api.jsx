import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import axios from "axios";

async function fetchProducts() {
  const res = await axios.get(`${BASE_URL}/products`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export default function useProducts() {
  return useQuery({queryKey: ["products"], queryFn: fetchProducts});
}
