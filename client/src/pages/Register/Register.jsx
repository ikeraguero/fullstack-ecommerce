import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { useRegisterUser } from "../../api/auth.api";
import { useState } from "react";

function Register() {
  const { mutateAsync: registerUser } = useRegisterUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
  }

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
            <label>Password</label>
            <input
              type="password"
              name="password"
              id=""
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.buttons}>
            <button className={styles.registerButton}>
              {isLoading ? "Creating your account" : "Sign Up"}
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
