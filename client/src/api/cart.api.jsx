import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import axios from "axios";

async function fetchCart(userId) {
  const res = await axios.get(`${BASE_URL}/cart/${userId}`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export default function useCart(userId) {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCart(userId),
  });
}
