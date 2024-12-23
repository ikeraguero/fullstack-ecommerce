import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useAuth } from "../../context/AuthContext";
import { loginSuccess } from "../../actions/AuthActions";

import styles from "./Login.module.css";

function Login({ refetchCart }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        loginData,
        {
          withCredentials: true,
        }
      );

      const { token, first_name, last_name, email, role, id } = res.data;
      const username = `${first_name} ${last_name}`;

      login(token);
      dispatch(loginSuccess(username, role, token, id, email, last_name, first_name));
      navigate("/");
      refetchCart();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.mainContainer}>
      <form className={styles.loginBox} onSubmit={handleSubmit}>
        <div className={styles.loginBoxContainer}>
          <h1>Sign In</h1>
          <div className={styles.loginField}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.loginField}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.buttons}>
            <button className={styles.loginButton}>Login</button>
            <Link to={"/register"} className={styles.btnLink}>
              <button className={styles.registerButton}>Register</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
