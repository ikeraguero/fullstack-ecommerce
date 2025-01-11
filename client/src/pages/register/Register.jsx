import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "./Register.module.css";
import { useRegisterUser } from "../../api/auth/auth.api";

function Register() {
  const { mutateAsync: registerUser } = useRegisterUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerUser(formData);
    } catch (err) {
      setError("An error ocurred. Please try again");
      console.log(error);
    }
    setIsLoading(false);
  }

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className={styles.mainContainer}>
      <form
        className={styles.loginBox}
        onSubmit={(e) => {
          handleRegister(e);
        }}
      >
        <div className={styles.loginBoxContainer}>
          <h1>Sign Up</h1>
          <div className={styles.loginFieldNames}>
            <div className={styles.nameField}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.nameField}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className={styles.loginField}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
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
                  onChange={handleInputChange}
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
            <button className={styles.registerButton}>
              {isLoading ? "Creating your account..." : "Sign Up"}
            </button>
            <div className={styles.linkContainer}>
              <span>Already have an account?</span>
              <Link to={"/login"} className={styles.btnLink}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
