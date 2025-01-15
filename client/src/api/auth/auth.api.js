import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { apiClientAuth } from "../apiClient";
import useApiMutation from "../useApiMutation";
import useAuth from "@hooks/auth/useAuth";

async function loginUser(data) {
  try {
    console.log(data);
    const res = await apiClientAuth.post("/login", data);
    if (res.status !== 200) {
      return new Error("Problem logging user");
    }
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unexpected error during login"
    );
  }
}

async function registerUser(data) {
  try {
    const res = await apiClientAuth.post("/register", data);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Unexpected error during registration"
    );
  }
}

async function authStatus() {
  try {
    const res = await apiClientAuth.get("/status");
    if (res.status !== 200) {
      throw new Error("Not authenticated");
    }
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error checking authentication status"
    );
  }
}

async function logoutUser() {
  try {
    const res = await apiClientAuth.post("/logout");
    if (res.status !== 200) {
      throw new Error("Failed to log out");
    }
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error logging out");
  }
}

export function useRegisterUser() {
  const navigate = useNavigate();
  const { role: userRole, login } = useAuth();

  function handleSuccess(data) {
    if (userRole !== "ADMIN" || null) {
      const { firstName, lastName, email, role, id, address } = data;
      const username = `${firstName} ${lastName}`;
      login(username, role, id, email, firstName, lastName, address);
      navigate("/");
    }
  }

  function handleError(error) {
    console.error("Registration error:", error.message);
  }

  const mutation = useApiMutation(
    (data) => registerUser(data),
    "users",
    handleSuccess,
    handleError
  );

  return mutation;
}

export function useAuthStatus() {
  return useQuery({
    queryFn: () => authStatus(),
    onError: (error) => {
      console.error("Auth status error:", error.message);
    },
    retry: 1,
  });
}

export function useLoginUser() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSuccess(data) {
    const { firstName, lastName, email, role, id, address } = data;
    const username = `${firstName} ${lastName}`;

    login(username, role, id, email, firstName, lastName, address);
    navigate("/");
  }

  function handleError(error) {
    console.error("Login error:", error.message);
  }

  return useApiMutation(loginUser, null, handleSuccess, handleError);
}

export function useLogoutUser() {
  const { logout } = useAuth();

  function handleSuccess() {
    logout();
  }

  function handleError(error) {
    console.error("Logout error:", error.message);
  }

  return useApiMutation(logoutUser, null, handleSuccess, handleError);
}
