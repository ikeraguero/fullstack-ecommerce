import { useQuery } from "@tanstack/react-query";
import { useUsersFormContext } from "../../hooks/useUsersFormContext";
import { useState } from "react";
import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";

async function updateUser(data) {
  try {
    const res = await apiClient.put("/users", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating user");
  }
}

async function getUsers() {
  try {
    const res = await apiClient.get("/users");
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
  const { state: users, dispatch: usersDispatch } = useUsersFormContext();
  return useApiMutation(
    (userId) => {
      setUserIdRemove(userId);
      deleteUser(userId);
    },
    "users",
    () => {
      refetch();
      usersDispatch({
        type: "loadUsers",
        payload: users.filter((user) => user.id !== userIdRemove),
      });
    },
    (error) => {
      console.error("Error deleting user:", error.message);
    }
  );
}

export function useUsers() {
  return useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
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
