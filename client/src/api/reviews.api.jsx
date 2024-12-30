import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config/config";
import axios from "axios";

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  return instance;
}

async function createReview(data) {
  const axiosInstance = createAxiosInstance();

  const res = axiosInstance.post("/review", data);
  if (res.status !== 201) {
    throw new Error("Problem fetching the data");
  }
  return res.data;
}

export function useCreateReview() {
  return useMutation({
    mutationFn: (data) => createReview(data),
  });
}
