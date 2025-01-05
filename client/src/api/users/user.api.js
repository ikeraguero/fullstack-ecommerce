import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiClient } from "../apiClient";
import useApiMutation from "../useApiMutation";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../../actions/userFormActions";

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
    console.log(res);
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
  const users = useSelector((state) => state.userForm.users);
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

export function useUsers(page, size) {
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
    (data) => {
      updateUser(data);
      console.log(data);
    },
    "users",
    null,
    (error) => {
      console.error("Error deleting user:", error.message);
    }
  );
}
