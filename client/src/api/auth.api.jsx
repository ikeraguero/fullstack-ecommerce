import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../actions/AuthActions";

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:8080/auth/",
    withCredentials: true,
  });

  return instance;
}

async function loginUser(data) {
  const axiosInstance = createAxiosInstance();
  console.log(data);
  const res = await axiosInstance.post("/login", data);
  if (res.status !== 200) {
    return new Error("Problem logging user");
  }
  return res.data;
}

async function registerUser(data) {
  const axiosInstance = createAxiosInstance();
  console.log(data);
  const res = await axiosInstance.post("/register", data);

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

export function useLoginUser() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
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
