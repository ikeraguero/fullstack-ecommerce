import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config/config";
import axios from "axios";

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  return instance;
}

async function fetchRoles() {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get(`/roles`);
  if (res.status !== 200) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export function useRoles() {
  return useQuery({
    queryFn: () => fetchRoles(),
    queryKey: ["roles"],
  });
}
