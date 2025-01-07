import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";
import { loadUsers } from "../../actions/userFormActions";
import useUserForm from "@hooks/user/useUserForm";

async function updateUser(data) {
  try {
    const res = await apiClient.put("/users", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating user");
  }
}

async function fetchUsers(page, size) {
  try {
    console.log(page, size);
    const res = await apiClient.get(`/users?page=${page}&size=${size}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching users");
  }
}

async function deleteUser(userId) {
  try {
    const res = await apiClient.delete(`/users/${userId}`);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || `Error removing user with ID ${userId}`
    );
  }
}

export function useDeleteUsers() {
  const { refetch } = useUsers();
  const [userIdRemove, setUserIdRemove] = useState();
  const dispatch = useDispatch();
  const users = useUserForm();
  return useApiMutation(
    (userId) => {
      setUserIdRemove(userId);
      deleteUser(userId);
    },
    "users",
    () => {
      refetch();
      dispatch(loadUsers(users.filter((user) => user.id !== userIdRemove)));
    },
    (error) => {
      console.error("Error deleting user:", error.message);
    }
  );
}

export function useUsers(page = 0, size = 10) {
  return useQuery({
    queryKey: ["users", page, size],
    queryFn: () => fetchUsers(page, size),
    onError: (error) => {
      console.error("Error deleting user:", error.message);
    },
  });
}

export function useUpdateUser() {
  return useApiMutation(
    (data) => updateUser(data),
    "users",
    null,
    (error) => {
      console.error("Error deleting user:", error.message);
    }
  );
}
