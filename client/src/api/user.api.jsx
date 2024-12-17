import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

function createAxiosInstance() {
  const instance = axios.create({
    withCredentials: true,
  });

  return instance;
}

async function createUser(data) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.post(
    "http://localhost:8080/auth/register",
    data
  );
  if (res !== 200) {
    return new Error("Problem creating user");
  }
  return res;
}

async function getUsers() {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get("http://localhost:8080/api/users");
  return res.data;
}

async function deleteUser(userId) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.delete(
    `http://localhost:8080/api/users/${userId}`
  );
  return res.data;
}

export function useDeleteUsers() {
  return useMutation({
    mutationFn: (userId) => deleteUser(userId),
  });
}

export function useUsers() {
  return useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
  });
}

export function useUpdateUser(data) {}

export function useCreateUser() {
  return useMutation({
    mutationFn: (data) => createUser,
    onSuccess: () => console.log("Succes"),
  });
}
