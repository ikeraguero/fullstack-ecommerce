import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "../../actions/AuthActions";
import { apiClientAuth } from "../apiClient";
import useApiMutation from "../useApiMutation";

async function loginUser(data) {
  try {
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
  const dispatch = useDispatch();

  function handleSuccess(data) {
    const { firstName, lastName, email, role, id } = data;
    const username = `${firstName} ${lastName}`;
    dispatch(loginSuccess(username, role, id, email, firstName, lastName));
    navigate("/");
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSuccess(data) {
    const { firstName, lastName, email, role, id } = data;
    const username = `${firstName} ${lastName}`;

    dispatch(loginSuccess(username, role, id, email, firstName, lastName));
    navigate("/");
  }

  function handleError(error) {
    console.error("Login error:", error.message);
  }

  return useApiMutation(loginUser, undefined, handleSuccess, handleError);
}

export function useLogoutUser() {
  const dispatch = useDispatch();

  function handleSuccess() {
    dispatch(logoutSuccess());
  }

  function handleError(error) {
    console.error("Logout error:", error.message);
  }

  return useApiMutation(logoutUser, undefined, handleSuccess, handleError);
}
