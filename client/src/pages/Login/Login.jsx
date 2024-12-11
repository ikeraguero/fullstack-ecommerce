import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    const res = await axios.post("http://localhost:8080/auth/login", loginData);

    const token = res.data.token;
    localStorage.setItem("authToken", token);
    console.log(res);
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
