import { useQuery } from "@tanstack/react-query";

import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";
import { useUserForm } from "@context/useUserFormContext";

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
  const { toggleDeleteUser } = useUserForm();
  return useApiMutation(
    (userId) => {
      deleteUser(userId);
    },
    "users",
    () => {
      toggleDeleteUser(null);
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
