import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "./Login.module.css";
import { useLoginUser } from "../../api/auth/auth.api";

function Login({ refetchCart }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { mutateAsync: loginUser } = useLoginUser();

  async function handleSubmit(e) {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    setIsLoading(true);
    setError(null);

    try {
      await loginUser(loginData);
      refetchCart();
    } catch (err) {
      setError("Invalid credentials or server error. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
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
              required
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
            <button
              className={styles.loginButton}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <div className={styles.linkContainer}>
              <span>{"Don't have an account?"}</span>
              <Link to={"/register"} className={styles.btnLink}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
