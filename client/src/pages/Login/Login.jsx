import styles from "./Login.module.css";
function Login() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginBoxContainer}>
          <h1>Login</h1>
          <div className={styles.loginField}>
            <label>Username</label>
            <input type="text" />
          </div>
          <div className={styles.loginField}>
            <label>Password</label>
            <input type="password" name="" id="" />
          </div>
          <div className={styles.buttons}>
            <button className={styles.loginButton}>Login</button>
            <button className={styles.registerButton}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
