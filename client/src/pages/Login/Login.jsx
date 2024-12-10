import { Link } from "react-router-dom";
import styles from "./Login.module.css";
function Login() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginBoxContainer}>
          <h1>Sign In</h1>
          <div className={styles.loginField}>
            <label>Email</label>
            <input type="email" />
          </div>
          <div className={styles.loginField}>
            <label>Password</label>
            <input type="password" name="" id="" />
          </div>
          <div className={styles.buttons}>
            <button className={styles.loginButton}>Login</button>
            <Link to={"/register"} className={styles.btnLink}>
              <button className={styles.registerButton}>Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
