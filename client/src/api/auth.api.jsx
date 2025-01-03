import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "../actions/AuthActions";

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:8080/auth/",
    withCredentials: true,
  });

  return instance;
}

async function loginUser(data) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.post("/login", data);
  if (res.status !== 200) {
    return new Error("Problem logging user");
  }
  return res.data;
}

async function registerUser(data) {
  const axiosInstance = createAxiosInstance();

  const res = await axiosInstance.post("/register", data);

  return res.data;
}

async function authStatus() {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.get("/status");
  if (res.status !== 200) {
    throw new Error("Not authenticated");
  }
  return res.data;
}

async function logoutUser() {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.post("/logout");
  if (res.status !== 200) {
    throw new Error("Failed to log out");
  }
  return res.data;
}

export function useRegisterUser() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users"]);
      const { token, firstName, lastName, email, role, id } = data;
      const username = `${firstName} ${lastName}`;

      login(token);
      dispatch(
        loginSuccess(username, role, token, id, email, firstName, lastName)
      );
      navigate("/");
    },
  });
}

export function useAuthStatus() {
  return useQuery({
    queryFn: () => authStatus(),
  });
}

export function useLoginUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      const { firstName, lastName, email, role, id } = data;
      const username = `${firstName} ${lastName}`;

      dispatch(loginSuccess(username, role, id, email, firstName, lastName));
      navigate("/");
    },
  });
}

export function useLogoutUser() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      dispatch(logoutSuccess());
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });
}
