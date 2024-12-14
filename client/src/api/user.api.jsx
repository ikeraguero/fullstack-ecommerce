import axios from "axios";

function createAxiosInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:8080/auth",
    withCredentials: true,
  });

  return instance;
}

export async function createUser(data) {
  const axiosInstance = createAxiosInstance();
  const res = await axiosInstance.post("/register", data);
  if (res !== 200) {
    return new Error("Problem creating user");
  }
  return res;
}
