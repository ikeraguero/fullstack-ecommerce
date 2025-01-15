import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "./Login.module.css";
import { useLoginUser } from "../../api/auth/auth.api";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { mutateAsync: loginUser } = useLoginUser();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await loginUser(formData);
    } catch (err) {
      setError("Invalid credentials or server error. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className={styles.mainContainer}>
      <form className={styles.loginBox} onSubmit={handleSubmit}>
        <div className={styles.loginBoxContainer}>
          <span className={styles.loginTitle}>
            <h1>Sign In</h1>
          </span>
          <span className={styles.loginSubtitle}>
            Enter your account details to sign in
          </span>
          <div className={styles.loginField}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className={styles.loginField}>
            <div className={styles.password}>
              <div className={styles.passwordInput}>
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id=""
                  value={formData.password}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.passwordToggleButton}
              >
                {showPassword ? (
                  <ion-icon name="eye-off-outline"></ion-icon>
                ) : (
                  <ion-icon name="eye-outline"></ion-icon>
                )}
              </button>
            </div>
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
