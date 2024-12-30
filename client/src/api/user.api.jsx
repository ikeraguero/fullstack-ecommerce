import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useUsersFormContext } from "../hooks/useUsersFormContext";
import { useState } from "react";

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

async function updateUser(data) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.put("http://localhost:8080/api/users", data);
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
  const [userIdRemove, setUserIdRemove] = useState();
  const { state: users, dispatch: usersDispatch } = useUsersFormContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) => {
      setUserIdRemove(userId);
      deleteUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      usersDispatch({
        type: "loadUsers",
        payload: users.filter((user) => user.id !== userIdRemove),
      });
    },
  });
}

export function useUsers() {
  return useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateUser(data),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
}
